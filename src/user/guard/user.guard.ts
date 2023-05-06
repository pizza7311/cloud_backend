import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ADMIN } from '../constant';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const args = ctx.getArgs();

    const user = await this.repo.findOneBy({ uid: args.uid });

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
