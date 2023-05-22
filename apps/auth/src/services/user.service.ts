import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto, UserRepository } from 'libs';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async updateUser(id, data: UpdateUserDto) {
    try {
      const newId = parseInt(id);
      return await this.userRepository.updateById(id, data);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getUser(id: number) {
    const data = await this.userRepository.getUserById(id);
    if (data) {
      return {
        code: '200',
        message: '',
        status: 'success',
        data: data,
      };
    } else {
      throw new NotFoundException('User Not Found');
    }
  }
}
