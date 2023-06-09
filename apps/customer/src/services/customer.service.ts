import {
  BadRequestException,
  Body,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  CustomerRepository,
  JwtGuard,
  UpdateUserDto,
  UserRepository,
} from 'libs';
import { RoleRepository } from 'libs/repositories/role.repository';

@Injectable()
export class CustomerService {
  userService: any;
  constructor(
    private customer: CustomerRepository,
    private user: UserRepository,
    private role: RoleRepository,
  ) {}

  async getCustomer(id) {
    try {
      const newid = parseInt(id);
      const sendData = await this.customer.findById(newid);

      if (sendData) {
        const getrole = await this.role.getUserRole(sendData.id);
        sendData['role'] = getrole ? getrole : '';
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

  async updateProfile(id, data) {
    try {
      const newId = parseInt(id);
      const sendData = await this.customer.updateById(id, data);
      return {
        code: '200',
        message: '',
        status: 'success',
        data: sendData,
      };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
