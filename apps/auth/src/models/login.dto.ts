import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
