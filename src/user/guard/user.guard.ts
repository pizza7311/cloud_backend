import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ADMIN } from '../constant';
import { UserService } from '../user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const args = ctx.getArgs();

    const user = await this.userService.findOneById(args.uid);

    if (!user) {
      throw new NotFoundException();
    }

    //if admin
    if (req.user.access_level === ADMIN) {
      return true;
    }

    if (req.user.uid !== user.uid) {
      return false;
    }
    return true;
  }
}
