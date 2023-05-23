import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import {
  CreateCategoryDto,
  CreateUserDto,
  JwtGuard,
  UpdateUserDto,
} from 'libs';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Put('/profile/update')
  @UseGuards(JwtGuard)
  async updateProfile(@Req() req, @Body() data: CreateUserDto) {
    const userId = await req.user.id;
    console.log(userId);
    return this.userService.updateUser(userId, data);
  }

  @Get('/profile')
  @UseGuards(JwtGuard)
  async getUserProfile(@Req() req) {
    const userId = await req.user.id;
    return this.userService.getUser(userId);
  }
}
