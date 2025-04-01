import { Controller, Get, Query } from '@nestjs/common';
import { DataService } from './data.service';
import { ResponseRepositoryDto } from 'src/schema/repository.schema';

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
}
