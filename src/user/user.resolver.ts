import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query('user')
  async user(@Args('uid') uid: string) {
    return this.userService.findOneById(uid);
  }
}
