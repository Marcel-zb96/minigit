import { Injectable } from '@nestjs/common';
import { ResponseUserDto } from 'src/schema/user.schema';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUser(): Promise<ResponseUserDto[]> {
    return await this.prismaService.user.findMany({
      select: {
        login: true,
        avatar_url: true,
        type: true,
      },
    });
  }
}
