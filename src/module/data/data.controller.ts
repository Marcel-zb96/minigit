import { Body, Controller, Get } from '@nestjs/common';
import { DataService } from './data.service';

@Controller()
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get('/sync')
  async populateDb(@Body('url') url: string): Promise<void> {
    await this.dataService.populateDb(url);
  }
}
