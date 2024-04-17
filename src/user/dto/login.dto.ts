import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  // @IsString()
  // readonly username: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
