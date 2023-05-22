import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  username: string;

  @IsString()
  @MinLength(6)
  passwordhash: string;

  @IsString()
  @IsOptional()
  securitystamp: string;
}
