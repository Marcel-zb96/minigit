import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseContributionDto } from 'src/schema/contribution.schema';
import {
  ResponseRepositoryDto,
  GitRepositoryPartialDto,
  GitRepositoryPartialDtoSchema,
  CreateRepositoryDto,
  ResponseRepositoryDtoSchema,
} from 'src/schema/repository.schema';

@Injectable()
export class RepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

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

  async createRepository(repositoryDto: CreateRepositoryDto): Promise<ResponseRepositoryDto> {
    return await this.prismaService.$transaction(async (prisma) => {
      const lastUser = await prisma.user.aggregate({
        _max: { id: true },
      });
      const lastRepository = await prisma.repository.aggregate({
        _max: { id: true },
      });

      const newRepoId = lastRepository._max.id ? lastRepository._max.id + 1 : 1;
      const newUserId = lastUser._max.id ? lastUser._max.id + 1 : 1;

      const newRepository = await prisma.repository.create({
        data: {
          id: newRepoId,
          full_name: repositoryDto.full_name,
          description: repositoryDto.description,
          html_url: repositoryDto.full_name,
          language: repositoryDto.language,
          stargazers_count: repositoryDto.stargazers_count,
          owner: {
            create: {
              id: newUserId,
              login: repositoryDto.owner.login,
              avatar_url: '',
              html_url: `https://github.com/${repositoryDto.owner.login}`,
              type: repositoryDto.owner.type,
            },
          },
        },
        include: {
          owner: true,
        },
      });

      return ResponseRepositoryDtoSchema.parse(newRepository);
    });
  }
}
