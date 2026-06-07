import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { DatabaseService } from 'src/database/database.service.js';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(private readonly db: DatabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.['session'] as string | undefined;

    if (!token) throw new UnauthorizedException();

    const session = await this.db.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session) throw new UnauthorizedException();

    if (session.expiresAt < new Date()) {
      await this.db.session.delete({ where: { token } });
      throw new UnauthorizedException('Session expired');
    }

    request.user = session.user;
    return true;
  }
}
