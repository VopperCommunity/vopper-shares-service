import { IsArray, IsEmail, IsEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string

  @IsArray()
  readonly preferences: Array<any>;

  @IsString()
  readonly description: string;

  @IsArray()
  readonly tecnologies: Array<any>;

  // comments

  // groups

  // events

  // messages
}
