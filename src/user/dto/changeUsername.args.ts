import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class ChangeUsernameArgs {
  @IsString()
  @Field()
  uid: string;
  @IsString()
  @Field()
  username: string;
}
