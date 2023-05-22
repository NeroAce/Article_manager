import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsMobilePhone,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateCustomerDto {
  @IsNumber()
  @IsOptional()
  userid: number;

  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsEmail()
  emailid: string;

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
}
