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

  async populateDb(org: string) {
    const gitToken = this.configService.get<string>('GITHUB_TOKEN');
    const url = `https://api.github.com/orgs/${org}/repos`;
    const requestConfig = {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${gitToken}`,
      },
    };

    const repositoriesResponse = await axios.get<GitRepositoryDto[]>(url, requestConfig);

    const contributions = await this.getContributions(requestConfig, repositoriesResponse.data);

    void this.prismaService.$transaction(async () => {
      await this.resetDb();
      await this.populateRepositories(repositoriesResponse.data);
      for (const contribution of contributions) {
        await this.populateUsersAndContributions(contribution.repoId, contribution.commits);
      }
    });
  }

  private async getContributions(
    requestConfig: { headers: { Accept: string; Authorization: string } },
    gitRepositories: GitRepositoryDto[],
  ) {
    const contributions: { repoId: number; commits: ContributionDto[] }[] = [];
    for (const gitRepository of gitRepositories) {
      const commitsUrl = gitRepository.commits_url.replace('{/sha}', '');

      const gitCommits = await axios.get<GitCommitDto[]>(commitsUrl, requestConfig);
      const validCommits: GitCommitDto[] = gitCommits.data.filter((gitCommit) => gitCommit.author?.id);

      const commits: ContributionDto[] = await Promise.all(
        validCommits.map(async (commit: GitCommitDto) => {
          const commitResponse = await axios.get<ContributionDto>(commit.url, requestConfig);
          return commitResponse.data;
        }),
      );
      contributions.push({
        repoId: gitRepository.id,
        commits: commits,
      });
    }
    return contributions;
  }

  private async populateUsersAndContributions(repositoryId: number, contributions: ContributionDto[]) {
    for (const contribution of contributions) {
      const repository = await this.prismaService.repository.findUnique({
        where: {
          github_id: repositoryId,
        },
      });
      await this.prismaService.user.upsert({
        where: { github_id: contribution.author.id },
        update: {
          contributions: {
            create: {
              repository: { connect: { id: repository?.id } },
              line_count: contribution.stats.total,
            },
          },
        },
        create: {
          github_id: contribution.author.id,
          login: contribution.author.login,
          avatar_url: contribution.author.avatar_url,
          html_url: contribution.author.html_url,
          type: contribution.author.type,
          contributions: {
            create: {
              repository: {
                connect: { id: repository?.id },
              },
            },
          },
        },
      });
    }
    this.logger.log(`Users and contributions populated for repository id: ${repositoryId}`);
  }

  private async populateRepositories(repositories: GitRepositoryDto[]): Promise<void> {
    const owner: UserDto = repositories[0].owner;

    await this.prismaService.user.create({
      data: {
        github_id: owner.id,
        login: owner.login,
        avatar_url: owner.avatar_url,
        html_url: owner.html_url,
        type: owner.type,
        repositories: {
          createMany: {
            data: repositories.map((repo) => {
              return {
                github_id: repo.id,
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
    this.logger.log('Repositories populated');
  }

  private async resetDb(): Promise<void> {
    await this.prismaService.contribution.deleteMany();
    await this.prismaService.repository.deleteMany();
    await this.prismaService.user.deleteMany();

    this.logger.log('Database reseted, all tables are empty');
  }
}
