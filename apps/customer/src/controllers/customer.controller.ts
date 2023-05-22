import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { JwtGuard } from 'libs';

@Controller('customer')
export class CustomerController {
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
}
