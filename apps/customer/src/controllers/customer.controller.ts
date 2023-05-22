import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { CreateCustomerDto, JwtGuard } from 'libs';

@Controller('customer')
export class CustomerController {
  userService: any;
  constructor(private customerService: CustomerService) {}

  @Get('/getprofile')
  @UseGuards(JwtGuard)
  async getProfile(@Req() req) {
    const userId = await req.user.id;
    return await this.customerService.getCustomer(userId);
  }
  @Get('/getuser')
  @UseGuards(JwtGuard)
  async getUser(@Req() req) {
    const userId = await req.user.id;
    return await this.customerService.getUser(userId);
  }
  @Get('/deleteaccount')
  @UseGuards(JwtGuard)
  async deleteAccount(@Req() req) {
    const userId = await req.user.id;
    return await this.customerService.deleteCustomer(userId);
  }
  @Put('/updateprofile')
  @UseGuards(JwtGuard)
  async updateProfile(@Req() req, @Body() data: CreateCustomerDto) {
    const userId = await req.user.id;
    return this.customerService.updateProfile(userId, data);
  }
}
