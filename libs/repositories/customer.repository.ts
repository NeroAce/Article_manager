import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma.service';
import { CreateCustomerDto } from 'libs/models/create-customer.dto';

@Injectable()
export class CustomerRepository {
  constructor(private prisma: PrismaService) {}

  async createCustomers(data: CreateCustomerDto) {
    return this.prisma.customers.create({ data: data });
  }

  async findByEmail(email: string) {
    return await this.prisma.customers.findFirst({ where: { emailid: email } });
  }

  async findById(id: number) {
    return await this.prisma.customers.findFirst({ where: { id: id } });
  }

  async deleteById(id: number) {
    return await this.prisma.customers.delete({ where: { id: id } });
  }
  async updateById(id: number, data) {
    return this.prisma.users.update({ where: { id: id }, data: { ...data } });
  }
}
