import { Test } from '@nestjs/testing';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/module/prisma/prisma.service';
import { Logger } from '@nestjs/common';

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
      jest.spyOn(dataService, 'populateDb').mockImplementation(() => Promise.resolve(undefined));

      expect(await dataController.populateDb()).toBe(undefined);
    });
  });
});
