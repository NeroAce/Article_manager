import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'libs';

@Injectable()
export class UserService {
  constructor(private user: UserRepository) {}
  async getProfile(id) {
    try {
      const newId = parseInt(id);
      const sendData = await this.user.getUserById(newId);
      if (sendData) {
        return {
          code: '200',
          message: '',
          status: 'success',
          data: sendData,
        };
      } else {
        throw new NotFoundException('User Not Found!');
      }
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async deleteAccount(id) {
    try {
      const newId = parseInt(id);
      const sendData = await this.user.deleteUserById(newId);
      if (sendData) {
        return {
          code: '200',
          message: '',
          status: 'success',
          data: sendData,
        };
      } else {
        throw new NotFoundException('User Not Found!');
      }
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
