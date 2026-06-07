import { Injectable, UnauthorizedException } from '@nestjs/common';
import bycrpt from 'bcrypt';
import { type Request, type Response } from 'express';
import { User } from 'prisma/generated/client.js';
import { UsersService } from 'src/users/users.service.js';
import { CreateUserDTO } from '../dtos/user.dto.js';
import { TokenService } from './token.service.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async signUp(user: CreateUserDTO) {
    return await this.usersService.createUser(user);
  }

  async signIn(user: User, response: Response) {
    return await this.tokenService.issueTokens(user, response);
  }

  async signOut(request: Request, response: Response) {
    return await this.tokenService.revokeSession(request, response);
  }

  async validateCredentials(email: string, password: string) {
    try {
      const result = await this.usersService.findUserByEmail(email);
      if (!result.status || !result.data) throw new UnauthorizedException();
      const isMatch = await bycrpt.compare(password, result.data.password);
      if (!isMatch) throw new UnauthorizedException();
      return result.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
}
