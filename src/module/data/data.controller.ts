import { Controller, Get, Param, Query } from '@nestjs/common';
import { DataService } from './data.service';
import { ResponseRepositoryDto } from 'src/schema/repository.schema';
import { ResponseContributionDto } from 'src/schema/contribution.schema';

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
}
