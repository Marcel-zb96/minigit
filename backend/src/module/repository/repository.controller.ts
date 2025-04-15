import { Body, Controller, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ResponseContributionDto } from 'src/schema/contribution.schema';
import { ResponseRepositoryDto, CreateRepositoryDto } from 'src/schema/repository.schema';

@UseInterceptors(CacheInterceptor)
@Controller('/repositories')
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Get()
  async getRepositories(@Query('q') q: string): Promise<ResponseRepositoryDto[]> {
    return await this.repositoryService.getRepositories(q);
  }

  @Get('/:id/contributions')
  async getContributors(@Param('id') id: string): Promise<ResponseContributionDto[]> {
    return await this.repositoryService.getContributors(id);
  }

  @Post()
  async createRepository(@Body() newRepositoryDto: CreateRepositoryDto): Promise<ResponseRepositoryDto> {
    return await this.repositoryService.createRepository(newRepositoryDto);
  }
}
