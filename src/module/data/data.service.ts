import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/module/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { UserDto } from 'src/schema/user.schema';
import { GitRepositoryDto } from 'src/schema/repository.schema';
import { ContributionDto, GitCommitDto } from 'src/schema/contribution.schema';

@Injectable()
export class DataService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {}

  async populateDb() {
    await this.resetDb();
    const gitToken = this.configService.get<string>('GITHUB_TOKEN');
    const requestConfig = {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${gitToken}`,
      },
    };

    const repositoriesResponse = await axios.get<GitRepositoryDto[]>(
      'https://api.github.com/orgs/facebook/repos',
      requestConfig,
    );
    await this.populateRepositories(repositoriesResponse.data);

    for (const gitRepository of repositoriesResponse.data) {
      const commitsUrl = gitRepository.commits_url.replace('{/sha}', '');

      const commits = await axios.get<GitCommitDto[]>(commitsUrl, requestConfig);
      const validCommits: GitCommitDto[] = commits.data.filter((commit) => commit.author?.id);

      const contributions: ContributionDto[] = await Promise.all(
        validCommits.map(async (commit: GitCommitDto) => {
          const contributionResponse = await axios.get<ContributionDto>(commit.url, requestConfig);
          return contributionResponse.data;
        }),
      );

      await this.populateUsersAndContributions(gitRepository.id, contributions);
    }
  }

  private async populateUsersAndContributions(repositoryId: number, contributions: ContributionDto[]) {
    await this.prismaService.$transaction(async (prisma) => {
      for (const contribution of contributions) {
        await prisma.user.upsert({
          where: { id: contribution.author.id },
          update: {
            contributions: {
              create: {
                repository: { connect: { id: repositoryId } },
                line_count: contribution.stats.total,
              },
            },
          },
          create: {
            id: contribution.author.id,
            login: contribution.author.login,
            avatar_url: contribution.author.avatar_url,
            html_url: contribution.author.html_url,
            type: contribution.author.type,
            contributions: {
              create: {
                repository: {
                  connect: { id: repositoryId },
                },
              },
            },
          },
        });
      }
    });
    this.logger.log(`Users and contributions populated for repository id: ${repositoryId}`);
  }

  private async populateRepositories(repositories: GitRepositoryDto[]): Promise<void> {
    await this.prismaService.$transaction(async (prisma) => {
      const owner: UserDto = repositories[0].owner;

      await prisma.user.create({
        data: {
          id: owner.id,
          login: owner.login,
          avatar_url: owner.avatar_url,
          html_url: owner.html_url,
          type: owner.type,
          repositories: {
            createMany: {
              data: repositories.map((repo) => {
                return {
                  id: repo.id,
                  full_name: repo.full_name,
                  description: repo.description,
                  html_url: repo.html_url,
                  language: repo.language,
                  stargazers_count: repo.stargazers_count,
                };
              }),
            },
          },
        },
      });
    });
    this.logger.log('Repositories populated');
  }

  private async resetDb(): Promise<void> {
    const deleteUsers = this.prismaService.user.deleteMany();
    const deleteContributions = this.prismaService.contribution.deleteMany();
    const deleteRepositories = this.prismaService.repository.deleteMany();

    await this.prismaService.$transaction([deleteContributions, deleteRepositories, deleteUsers]);

    this.logger.log('Database reseted, all tables are empty');
  }
}
