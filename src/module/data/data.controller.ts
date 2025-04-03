import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateRepositoryDto, ResponseRepositoryDto } from 'src/schema/repository.schema';
import { ResponseContributionDto } from 'src/schema/contribution.schema';
import { ResponseUserDto } from 'src/schema/user.schema';

@Controller('api')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get('/v1/sync')
  async syncDb(): Promise<void> {
    await this.dataService.syncDb();
  }

  @Get('/v1/repository')
  async getRepositories(@Query('q') q: string): Promise<ResponseRepositoryDto[]> {
    return await this.dataService.getRepositories(q);
  }

  @Get('/v1/repository/:id/contributions')
  async getContributors(@Param('id') id: string): Promise<ResponseContributionDto[]> {
    return await this.dataService.getContributors(id);
  }

  @Get('/v1/user')
  async getAllUser(): Promise<ResponseUserDto[]> {
    return await this.dataService.getAllUser();
  }

  @Post('v1/repository')
  async createRepository(@Body() newRepositoryDto: CreateRepositoryDto): Promise<ResponseRepositoryDto> {
    return await this.dataService.createRepository(newRepositoryDto);
  }
}
