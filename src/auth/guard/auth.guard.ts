import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const { access, refresh } = getAccessAndRefresh(req);

    //TODO: rtr 구현 필요
    if (!access && !refresh) {
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
  const { access_token, refresh_token } = req.cookies;
  return { access: access_token, refresh: refresh_token };
};
