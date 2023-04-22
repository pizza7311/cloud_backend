import { IsString, IsNotEmpty } from 'class-validator';
export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  userid: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
