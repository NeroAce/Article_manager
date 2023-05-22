import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
