import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseUserDto } from 'src/schema/user.schema';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Reflector } from '@nestjs/core';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
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
    service = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
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

      jest.spyOn(service, 'getAllUser').mockImplementation(() => Promise.resolve(result));

      expect(await controller.getAllUser()).toBe(result);
    });
  });
});
