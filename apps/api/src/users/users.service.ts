import { Injectable, NotFoundException } from '@nestjs/common';
import { ActionResponse } from '@org/lib';
import bycrpt from 'bcrypt';
import { Account, Session, User } from 'prisma/generated/client.js';
import { DatabaseService } from 'src/database/database.service.js';
import { parseError } from 'src/utilities/utils.js';
import { CreateUserDTO } from '../dtos/user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async createUser(
    user: CreateUserDTO,
  ): Promise<ActionResponse<{ userId: string }>> {
    try {
      const checkUserExisted = await this.db.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (checkUserExisted) {
        throw new Error('This Email is Already Taken');
      }

      const result = await this.db.$transaction(async (dbTnx) => {
        const { name, email, password, gender } = user;
        const createdUser = await dbTnx.user.create({
          data: { name, email, gender },
        });
        const hashedPassword = await bycrpt.hash(password, 10);
        await dbTnx.account.create({
          data: {
            userId: createdUser.id,
            accountId: createdUser.id,
            providerId: 'credential',
            password: hashedPassword,
          },
        });
        return createdUser;
      });
      return { status: true, data: { userId: result.id } };
    } catch (error) {
      return {
        status: false,
        errors: {
          message:
            error instanceof Error
              ? error.message
              : 'Unexpected error. Please try again.',
        },
      };
    }
  }

  async findUserByEmail(
    email: string,
  ): Promise<ActionResponse<User & { password: string }>> {
    try {
      const user = await this.db.user.findUnique({
        where: { email },
        include: {
          account: {
            where: { providerId: 'credential' },
            select: { password: true },
          },
        },
      });
      if (!user) throw new NotFoundException('User not found');
      const { account, ...rest } = user;
      const password = account[0]?.password;
      if (!password)
        throw new NotFoundException('Account credentials not found');
      return { status: true, data: { ...rest, password } };
    } catch (error) {
      return {
        status: false,
        errors: {
          message: error instanceof Error ? error.message : 'Unexpected error',
        },
      };
    }
  }

  async findUserById(id: string): Promise<ActionResponse<User>> {
    try {
      const user = await this.db.user.findUnique({ where: { id } });
      if (!user) throw new NotFoundException('User not found');
      return { status: true, data: user };
    } catch (error) {
      return {
        status: false,
        errors: { message: parseError(error, 'Failed to find user') },
      };
    }
  }

  async findAccountByUserId(userId: string): Promise<ActionResponse<Account>> {
    try {
      const account = await this.db.account.findFirst({
        where: { userId, providerId: 'credential' },
      });
      if (!account) throw new NotFoundException('Account not found');
      return { status: true, data: account };
    } catch (error) {
      return {
        status: false,
        errors: { message: parseError(error, 'Failed to find account') },
      };
    }
  }

  async getAllUsers(): Promise<
    ActionResponse<(User & { password: string | null; providerId: string })[]>
  > {
    try {
      const users = await this.db.user.findMany({
        include: {
          account: {
            select: { password: true, providerId: true },
          },
        },
      });
      if (!users || users.length === 0) {
        return { status: true, data: undefined };
      }
      const transformedUsers = users.map((user) => {
        const { account, ...rest } = user;
        return {
          ...rest,
          password: account[0]?.password ?? null,
          providerId: account[0]?.providerId ?? '',
        };
      });
      return { status: true, data: transformedUsers };
    } catch (error) {
      return {
        status: false,
        errors: { message: parseError(error, 'Failed to load users') },
      };
    }
  }

  async deleteUserById(id: string): Promise<ActionResponse<string>> {
    try {
      const user = await this.db.user.findUnique({
        where: { id },
        select: { id: true },
      });
      if (!user) throw new NotFoundException('User not found');
      await this.db.user.delete({ where: { id: user.id } });
      return { status: true, data: 'Successfully deleted user' };
    } catch (error) {
      return {
        status: false,
        errors: { message: parseError(error, 'Failed to delete user') },
      };
    }
  }

  async createSession(data: {
    userId: string;
    token: string;
    expiresAt: Date;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<ActionResponse<Session>> {
    try {
      const session = await this.db.session.create({
        data: {
          token: data.token,
          expiresAt: data.expiresAt,
          userId: data.userId,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
        },
      });
      return { status: true, data: session };
    } catch (error) {
      return {
        status: false,
        errors: { message: parseError(error, 'Failed to create session') },
      };
    }
  }

  async findSessionByToken(
    token: string,
  ): Promise<ActionResponse<Session & { user: User }>> {
    try {
      const session = await this.db.session.findUnique({
        where: { token },
        include: { user: true },
      });
      if (!session) throw new NotFoundException('Session not found');
      return { status: true, data: session };
    } catch (error) {
      return {
        status: false,
        errors: { message: parseError(error, 'Session not found') },
      };
    }
  }

  async deleteSessionByToken(token: string): Promise<ActionResponse<string>> {
    try {
      await this.db.session.delete({ where: { token } });
      return { status: true, data: 'Session deleted' };
    } catch (error) {
      return {
        status: false,
        errors: { message: parseError(error, 'Failed to delete session') },
      };
    }
  }
}
