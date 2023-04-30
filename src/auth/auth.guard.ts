import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { access, refresh } = getAccessAndRefresh(req);

    //TODO: rtr 구현 필요
    if (access && refresh) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwt.verifyAsync(access, {
        secret: process.env.JWT_SECRET,
      });
      req.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}

const getAccessAndRefresh = (
  req: Request,
): { access: string; refresh: string } => {
  const access = req.cookies('access_token');
  const refresh = req.cookies('refresh_token');

  return { access, refresh };
};
