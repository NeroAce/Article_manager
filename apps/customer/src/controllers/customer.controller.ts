import { Controller, Get, Param } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('/getprofile/:id')
  async getCustomerProfile(@Param('id') id) {
    return await this.customerService.getCustomer(id);
  }
}
