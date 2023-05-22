import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtGuard } from 'libs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getuser')
  @UseGuards(JwtGuard)
  async getUser(@Req() req) {
    const userId = await req.user.id;
    return this.userService.getProfile(userId);
  }

  @Get('/deleteaccount')
  @UseGuards(JwtGuard)
  async deleteAccount(@Req() req) {
    const userId = await req.user.id;
    return this.userService.deleteAccount(userId);
  }
}
