import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ResponseContributionDto } from 'src/schema/contribution.schema';
import {
  ResponseRepositoryDto,
  CreateRepositoryDtoSwagger,
  CreateRepositoryDtoSchema,
} from 'src/schema/repository.schema';
import { ApiBody } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/schema/zod.validator';

@UseInterceptors(CacheInterceptor)
@Controller('/repositories')
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Get()
  async getRepositories(@Query('q') q: string): Promise<ResponseRepositoryDto[]> {
    return await this.repositoryService.getRepositories(q);
  }

  @Get('/:id/contributions')
  async getContributors(@Param('id') id: string): Promise<ResponseContributionDto[]> {
    return await this.repositoryService.getContributors(id);
  }

  @Post()
  @ApiBody({ type: CreateRepositoryDtoSwagger })
  @UsePipes(new ZodValidationPipe(CreateRepositoryDtoSchema))
  async createRepository(@Body() newRepositoryDto: CreateRepositoryDtoSwagger): Promise<ResponseRepositoryDto> {
    const parsedBody = CreateRepositoryDtoSchema.safeParse(newRepositoryDto);
    if (!parsedBody.success) {
      throw new BadRequestException(parsedBody.error);
    }
    return await this.repositoryService.createRepository(parsedBody.data);
  }
}
