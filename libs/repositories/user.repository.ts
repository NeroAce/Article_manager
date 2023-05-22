import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto, PrismaService, UpdateUserDto } from 'libs';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  ///////////////////////////////////////////CREATE USERS//////////////////////////////////////////////
  async createUser(data: CreateUserDto) {
    const findUser = await this.prisma.users.findFirst({
      where: { username: data.username },
    });

    if (!findUser) {
      const token = await this.hashPassword(data.passwordhash);
      if (token) {
        data.passwordhash = token;
        return await this.prisma.users.create({
          data,
          select: { id: true, username: true },
        });
      } else {
        throw new InternalServerErrorException('Unable To Create Token');
      }
    } else {
      throw new BadRequestException('User Already Exists');
    }
  }
  ///////////////////////////////////////////GET ALL USERS///////////////////////////////////////////////

  async getAllUsers() {
    return await this.prisma.users.findMany({});
  }

  ///////////////////////////////////////////GET USER BY ID//////////////////////////////////////////////
  async getUserById(id: number) {
    return await this.prisma.users.findFirst({
      where: { id: id },
      select: { id: true, username: true },
    });
  }

  ///////////////////////////////////////////GET USERS BY EMAIL///////////////////////////////////////////////
  async updateById(id: number, data: UpdateUserDto) {
    return this.prisma.users.update({ where: { id: id }, data: { ...data } });
  }

  ///////////////////////////////////////////GET USERS BY EMAIL///////////////////////////////////////////////

  async getUserByEmail(email: string) {
    return this.prisma.users.findFirst({ where: { username: email } });
  }

  async changePassword(id, password: string) {
    const hashedPassword = await this.hashPassword(password);
    if (hashedPassword) {
      return await this.prisma.users.update({
        where: { id: id },
        data: { passwordhash: hashedPassword },
        select: { username: true },
      });
    } else {
      throw new InternalServerErrorException(
        'Failed to create hashed password',
      );
    }
  }

  ///////////////////////////////////////////HELPER FUNCTION//////////////////////////////////////////////
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Number of salt rounds to use for hashing

    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }
}
