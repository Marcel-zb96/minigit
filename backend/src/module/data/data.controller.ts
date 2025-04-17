import { Controller, Get, Query } from '@nestjs/common';
import { DataService } from './data.service';

@Controller()
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get('/sync')
  async populateDb(@Query('org') org: string): Promise<void> {
    await this.dataService.populateDb(org);
  }
}
