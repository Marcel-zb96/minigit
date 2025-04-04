import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryController } from './repository.controller';
import { RepositoryService } from './repository.service';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseContributionDto } from 'src/schema/contribution.schema';
import { ResponseRepositoryDto, CreateRepositoryDto } from 'src/schema/repository.schema';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Reflector } from '@nestjs/core';

describe('RepositoryController', () => {
  let controller: RepositoryController;
  let service: RepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepositoryController],
      providers: [
        RepositoryService,
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        },
        {
          provide: Reflector,
          useValue: {
            get: jest.fn(),
            getAllAndOverride: jest.fn(),
            getAllAndMerge: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RepositoryController>(RepositoryController);
    service = module.get<RepositoryService>(RepositoryService);
  });
  describe('getRepositories', () => {
    it('should return an array or repositories', async () => {
      const result: ResponseRepositoryDto[] = [
        {
          full_name: 'test_repository',
          description: 'test_description',
          language: 'C++',
          stargazers_count: 0,
          id: 1,
          owner: {
            id: 1,
            login: 'test_username',
          },
          _count: {
            contributions: 0,
          },
        },
      ];

      jest.spyOn(service, 'getRepositories').mockImplementation(() => Promise.resolve(result));

      expect(await controller.getRepositories('')).toBe(result);
    });
  });

  describe('getContributions', () => {
    it('should return an array of contributions', async () => {
      const result: ResponseContributionDto[] = [
        {
          user: {
            login: 'test_username',
          },
          line_count: 0,
        },
      ];

      jest.spyOn(service, 'getContributors').mockImplementation(() => Promise.resolve(result));

      expect(await controller.getContributors('24776729')).toBe(result);
    });
  });

  describe('createRepository', () => {
    it('should return the created repository', async () => {
      const newRepository: CreateRepositoryDto = {
        full_name: 'test_repository',
        description: 'test_description',
        language: 'C++',
        stargazers_count: 0,
        owner: {
          login: 'test_username',
          type: 'User',
        },
      };

      const result: ResponseRepositoryDto = {
        full_name: 'test_repository',
        description: 'test_description',
        language: 'C++',
        stargazers_count: 0,
        id: 1,
        owner: {
          id: 1,
          login: 'test_username',
        },
        _count: {
          contributions: 0,
        },
      };

      jest.spyOn(service, 'createRepository').mockImplementation(() => Promise.resolve(result));

      expect(await controller.createRepository(newRepository)).toBe(result);
    });
  });
});
