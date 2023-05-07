import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserGuard } from './guard/user.guard';
import { ChangeUsernameArgs } from './dto/changeUsername.args';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query('user')
  @UseGuards(AuthGuard, UserGuard)
  async user(@Args('uid') uid: string) {
    return this.userService.findOneById(uid);
  }

  @Mutation()
  @UseGuards(AuthGuard, UserGuard)
  async deleteUser(@Args('uid') uid: string) {
    return this.userService.deleteUser(uid);
  }

  @Mutation()
  @UseGuards(AuthGuard, UserGuard)
  async changeUsername(@Args() args: ChangeUsernameArgs) {
    return this.userService.changeUsername(args);
  }
}
