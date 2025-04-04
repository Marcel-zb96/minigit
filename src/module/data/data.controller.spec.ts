import { Test } from '@nestjs/testing';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { CreateRepositoryDto, ResponseRepositoryDto } from 'src/schema/repository.schema';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/module/prisma/prisma.service';
import { Logger } from '@nestjs/common';
import { ResponseContributionDto } from 'src/schema/contribution.schema';
import { ResponseUserDto } from 'src/schema/user.schema';

describe('DataConrtroller', () => {
  let dataController: DataController;
  let dataService: DataService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DataController],
      providers: [
        DataService,
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mock_token'),
          },
        },
      ],
    }).compile();

    dataService = moduleRef.get(DataService);
    dataController = moduleRef.get(DataController);
  });

  describe('syncDb', () => {
    it('should return undefined', async () => {
      jest.spyOn(dataService, 'syncDb').mockImplementation(() => Promise.resolve(undefined));

      expect(await dataController.syncDb()).toBe(undefined);
    });
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

      jest.spyOn(dataService, 'getRepositories').mockImplementation(() => Promise.resolve(result));

      expect(await dataController.getRepositories('')).toBe(result);
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

      jest.spyOn(dataService, 'getContributors').mockImplementation(() => Promise.resolve(result));

      expect(await dataController.getContributors('24776729')).toBe(result);
    });
  });

  describe('getAllUser', () => {
    it('should return an array of users', async () => {
      const result: ResponseUserDto[] = [
        {
          type: 'User',
          login: 'test_username',
          avatar_url: 'https://testurl.test',
        },
      ];

      jest.spyOn(dataService, 'getAllUser').mockImplementation(() => Promise.resolve(result));

      expect(await dataController.getAllUser()).toBe(result);
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

      jest.spyOn(dataService, 'createRepository').mockImplementation(() => Promise.resolve(result));

      expect(await dataController.createRepository(newRepository)).toBe(result);
    });
  });
});
