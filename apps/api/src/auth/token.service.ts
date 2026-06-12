import { Injectable } from '@nestjs/common';
import { ActionResponse, AuthCookieType } from '@org/lib';
import { type Request, type Response } from 'express';
import { User } from 'prisma/generated/client.js';
import { UsersService } from 'src/users/users.service.js';
import { parseError } from 'src/utilities/utils.js';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TokenService {
  constructor(private readonly usersService: UsersService) {}

  async issueTokens(
    user: User,
    response: Response,
  ): Promise<ActionResponse<AuthCookieType>> {
    try {
      const token = uuid();
      const sessionDuration = process.env.SESSION_DURATION_IN_MLS!;
      const expiresAt = new Date(Date.now() + Number(sessionDuration));
      const req = response.req as Request;

      const sessionResult = await this.usersService.createSession({
        userId: user.id,
        token,
        expiresAt,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      if (!sessionResult.status) {
        throw new Error(
          sessionResult.errors?.message ?? 'Session creation failed',
        );
      }

      response.cookie('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
      });

      return {
        status: true,
        data: {
          token,
          expiresInMilliseconds: expiresAt.getTime(),
        },
      };
    } catch (error) {
      return {
        status: false,
        errors: { message: parseError(error, 'Failed to create session') },
      };
    }
  }

  async revokeSession(
    request: Request,
    response: Response,
  ): Promise<ActionResponse<string>> {
    try {
      const token = request.cookies?.['session'] as string | undefined;
      if (token) {
        await this.usersService.deleteSessionByToken(token);
      }
      response.clearCookie('session');
      return { status: true, data: 'Successfully signed out.' };
    } catch (error) {
      return {
        status: false,
        errors: { message: parseError(error, 'Failed to sign out') },
      };
    }
  }
}
