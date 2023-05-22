import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @IsEmail()
  emailid: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  gender: string;

  @IsOptional()
  @IsDateString()
  dob: string;

  @IsOptional()
  @IsPhoneNumber('IN')
  mobile: string;

  @IsOptional()
  @IsDateString()
  registrationon: string;

  @IsOptional()
  @IsNumber()
  lastactivityby: number;

  @IsOptional()
  @IsDateString()
  lastactivityon: string;

  @IsBoolean()
  @IsOptional()
  isactive: boolean;

  @IsBoolean()
  @IsOptional()
  isdeleted: boolean;

  @IsOptional()
  @IsString()
  securitystamp: string;

  @IsOptional()
  @IsNumber()
  userid: number;
}
