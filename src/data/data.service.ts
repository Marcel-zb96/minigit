import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DataService {
  constructor(private readonly prismaService: PrismaService) {}

  populateDb(): void {
    axios.get('');
    this.prismaService.user.findMany();
  }
}
