import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.services';
import { CreateUserDto } from 'libs';
import { LoginDto } from '../models/login.dto';
import { ForgetPasswordDto } from '../models/forget-password.dto';
import { ResetPasswordDto } from '../models/reset-password.dto';
import { ChangePasswordDto } from '../models/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() data: CreateUserDto) {
    return await this.authService.signUp(data);
  }
  @Post('/login')
  async logIn(@Body() data: LoginDto) {
    return await this.authService.logIn(data);
  }

  @Post('/forgetPassword')
  async generateOtp(@Body() data: ForgetPasswordDto) {
    return await this.authService.forgetPassword(data);
  }

  @Post('/resetPassword')
  async resetPassword(@Body() data: ResetPasswordDto) {
    return await this.authService.resetPassword(data);
  }
  @Post('/changePassword')
  async changePassword(@Body() data: ChangePasswordDto) {
    return await this.authService.changePassword(data);
  }
}
