import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { UserDto } from 'src/schema/user.schema';
import {
  GitRepositoryDto,
  ResponseRepositoryDto,
  GitRepositoryPartialDto,
  GitRepositoryPartialDtoSchema,
} from 'src/schema/repository.schema';
import { ContributionDto, GitCommitDto, ResponseContributionDto } from 'src/schema/contribution.schema';

@Injectable()
export class DataService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {}

  async syncDb() {
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

  async getRepositories(queryParam: string): Promise<ResponseRepositoryDto[]> {
    const filter: GitRepositoryPartialDto = GitRepositoryPartialDtoSchema.parse({
      [queryParam.split(':')[0]]: queryParam.split(':')[1],
    });

    const repositories: ResponseRepositoryDto[] = await this.prismaService.repository.findMany({
      where: {
        ...filter,
      },
      select: {
        id: true,
        owner: {
          select: {
            id: true,
            login: true,
          },
        },
        full_name: true,
        description: true,
        language: true,
        stargazers_count: true,
        _count: {
          select: {
            contributions: true,
          },
        },
      },
    });

    return repositories;
  }

  async getContributors(repositoryId: string): Promise<ResponseContributionDto[]> {
    return await this.prismaService.contribution.findMany({
      select: {
        user: {
          select: {
            login: true,
          },
        },
        line_count: true,
      },
      where: {
        repositoryId: parseInt(repositoryId),
      },
    });
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
  }

  private async populateRepositories(repositories: GitRepositoryDto[]) {
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
  }

  private async resetDb(): Promise<void> {
    const deleteUsers = this.prismaService.user.deleteMany();
    const deleteContributions = this.prismaService.contribution.deleteMany();
    const deleteRepositories = this.prismaService.repository.deleteMany();

    await this.prismaService.$transaction([deleteContributions, deleteRepositories, deleteUsers]);

    this.logger.log('Database reseted, all tables are empty');
  }
}
