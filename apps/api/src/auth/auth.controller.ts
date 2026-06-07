import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { type Request, type Response } from 'express';
import type { User } from 'prisma/generated/client.js';
import { type CreateUserDTO } from 'src/dtos/user.dto.js';
import { CurrentUser } from '../decorators/user.decorator.js';
import { AuthService } from './auth.service.js';
import { LocalAuthGuard } from './guards/local-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.signIn(user, response);
  }

  @Post('/signup')
  async signUp(@Body() user: CreateUserDTO) {
    return await this.authService.signUp(user);
  }

  @Post('/signout')
  async signOut(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.signOut(request, response);
  }
}
