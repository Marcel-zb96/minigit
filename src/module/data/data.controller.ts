import { Body, Controller, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateRepositoryDto, ResponseRepositoryDto } from 'src/schema/repository.schema';
import { ResponseContributionDto } from 'src/schema/contribution.schema';
import { ResponseUserDto } from 'src/schema/user.schema';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('api/v1')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get('/sync')
  async syncDb(): Promise<void> {
    await this.dataService.syncDb();
  }

  @Get('/repository')
  async getRepositories(@Query('q') q: string): Promise<ResponseRepositoryDto[]> {
    return await this.dataService.getRepositories(q);
  }

  @Get('/repository/:id/contributions')
  async getContributors(@Param('id') id: string): Promise<ResponseContributionDto[]> {
    return await this.dataService.getContributors(id);
  }

  @Get('/user')
  async getAllUser(): Promise<ResponseUserDto[]> {
    return await this.dataService.getAllUser();
  }

  @Post('/repository')
  async createRepository(@Body() newRepositoryDto: CreateRepositoryDto): Promise<ResponseRepositoryDto> {
    return await this.dataService.createRepository(newRepositoryDto);
  }
}
