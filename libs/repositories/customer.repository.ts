import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma.service';
import { CreateCustomerDto } from 'libs/models/create-customer.dto';

@Injectable()
export class CustomerRepository {
  constructor(private Prisma: PrismaService) {}

  async createCustomers(data: CreateCustomerDto) {
    return this.Prisma.customers.create({ data: data });
  }

  async findByEmail(email: string) {
    return await this.Prisma.customers.findFirst({ where: { emailid: email } });
  }
}
