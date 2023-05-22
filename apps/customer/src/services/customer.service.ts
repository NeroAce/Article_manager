import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CustomerRepository, UserRepository } from 'libs';

@Injectable()
export class CustomerService {
  constructor(
    private customer: CustomerRepository,
    private user: UserRepository,
  ) {}

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
  async getUser(id) {
    const data = await this.getCustomer(id);
    if (data) {
      const userId = data.data.userid;
      const userData = await this.user.getUserById(userId);
      if (userData) {
        return {
          code: '200',
          message: '',
          status: 'success',
          data: userData,
        };
      } else {
        throw new NotFoundException('user not found');
      }
    } else {
      throw new NotFoundException('user not found for this id');
    }
  }
  async deleteCustomer(id) {
    const deleted = await this.customer.deleteById(id);
    if (deleted) {
      return {
        code: '200',
        message: '',
        status: 'success',
        data: deleted,
      };
    } else {
      throw new BadRequestException('Can not delete for this id');
    }
  }
}
