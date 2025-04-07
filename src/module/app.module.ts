import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataModule } from './data/data.module';
import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import { redisStore } from 'cache-manager-redis-store';
import { UserModule } from './user/user.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [
    DataModule,
    UserModule,
    RepositoryModule,
    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<string>('REDIS_PORT')!,
          ttl: configService.get<string>('REDIS_TTL')!,
        }),
      }),
    }),
    RepositoryModule,
  ],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '/*path',
      method: RequestMethod.ALL,
    });
  }
}
