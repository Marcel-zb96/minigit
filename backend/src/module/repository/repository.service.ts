import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseContributionDto } from 'src/schema/contribution.schema';
import { ResponseRepositoryDto, CreateRepositoryDto, ResponseRepositoryDtoSchema } from 'src/schema/repository.schema';

@Injectable()
export class RepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getRepositories(queryParam: string): Promise<ResponseRepositoryDto[]> {
    const repositories: ResponseRepositoryDto[] = await this.prismaService.repository.findMany({
      where: {
        OR: [
          { full_name: { contains: queryParam, mode: 'insensitive' } },
          { description: { contains: queryParam, mode: 'insensitive' } },
          { language: { contains: queryParam, mode: 'insensitive' } },
          { owner: { login: { contains: queryParam, mode: 'insensitive' } } },
        ],
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
        id: true,
        user: {
          select: {
            login: true,
          },
        },
        line_count: true,
      },
      where: {
        repositoryId: repositoryId,
      },
    });
  }

  async createRepository(repositoryDto: CreateRepositoryDto): Promise<ResponseRepositoryDto> {
    return await this.prismaService.$transaction(async (prisma) => {
      const newRepository = await prisma.repository.create({
        data: {
          full_name: `${repositoryDto.owner.login}/${repositoryDto.full_name}`,
          description: repositoryDto.description,
          html_url: repositoryDto.full_name,
          language: repositoryDto.language,
          stargazers_count: repositoryDto.stargazers_count,
          owner: {
            create: {
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
