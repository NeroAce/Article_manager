import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CustomerRepository } from 'libs';

@Injectable()
export class CustomerService {
  constructor(private customer: CustomerRepository) {}

  async getCustomer(id) {
    try {
      const newid = parseInt(id);
      const sendData = await this.customer.findById(newid);
      if (sendData) {
        return {
          code: '200',
          message: '',
          status: 'success',
          data: sendData,
        };
      } else {
        throw new NotFoundException('Customer with this id not found!');
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
