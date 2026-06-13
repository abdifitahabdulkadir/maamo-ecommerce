import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import z from 'zod';
import { AuthModule } from './auth/auth.module.js';
import { DatabaseModule } from './database/database.module.js';
import { ProductsModule } from './products/products.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    DatabaseModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'long',
          ttl: 1000, // 1 second
          limit: 10,
        },
      ],
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate(result) {
        return z
          .object({
            DATABASE_URL: z.string().min(1, 'Database Url is required'),
            WEB_ORIGIN: z.string().min(1, 'Web origin is required'),
            SESSION_DURATION_IN_MLS: z
              .string()
              .min(1, 'Session Duration is missing'),
          })
          .parse(result);
      },
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
