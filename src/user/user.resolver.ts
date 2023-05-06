import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserGuard } from './guard/user.guard';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query('user')
  @UseGuards(AuthGuard, UserGuard)
  async user(@Args('uid') uid: string) {
    return this.userService.findOneById(uid);
  }
}
