import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import {
  CustomerRepository,
  JWTModule,
  PrismaService,
  UserRepository,
} from 'libs';
import { CustomerService } from './services/customer.service';

@Module({
  imports: [JWTModule],
  controllers: [CustomerController],
  providers: [
    CustomerRepository,
    CustomerService,
    PrismaService,
    UserRepository,
  ],
})
export class CustomerModule {}
