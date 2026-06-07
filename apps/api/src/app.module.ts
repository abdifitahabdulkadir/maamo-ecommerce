import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import z from 'zod';
import { AuthModule } from './auth/auth.module.js';
import { DatabaseModule } from './database/database.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,

      validate(result) {
        return z
          .object({
            DATABASE_URL: z.string().min(1, 'Database Url is required'),
          })
          .parse(result);
      },
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
