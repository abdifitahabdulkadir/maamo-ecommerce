import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { SessionAuthGuard } from './guards/session-auth.guard.js';
import { LocalAuthGuard } from './guards/local-auth.guard.js';
import { LocalStrategy } from './strategies/local.stragies.js';
import { TokenService } from './token.service.js';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [
    AuthService,
    TokenService,
    LocalStrategy,
    LocalAuthGuard,
    SessionAuthGuard,
  ],
  controllers: [AuthController],
  exports: [SessionAuthGuard],
})
export class AuthModule {}
