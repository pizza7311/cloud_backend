import { createParamDecorator } from '@nestjs/common/decorators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext } from '@nestjs/common';

/**
 * req.user 정보 가져오기
 * @param {('uid'|'access_level')} key 'uid' 와 'access_level' 만 가능
 */
export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const user = GqlExecutionContext.create(ctx).getContext().req.user;
    return data ? user[data] : user;
  },
);
