import { Controller, Get } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('api')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get('/v1/sync')
  async syncDb(): Promise<void> {
    await this.dataService.syncDb();
  }
}
