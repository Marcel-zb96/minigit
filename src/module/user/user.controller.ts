import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ResponseUserDto } from 'src/schema/user.schema';
import { UserService } from './user.service';

@UseInterceptors(CacheInterceptor)
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser(): Promise<ResponseUserDto[]> {
    return await this.userService.getAllUser();
  }
}
