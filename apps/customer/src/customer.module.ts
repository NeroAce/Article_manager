import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { CustomerRepository, JWTModule, PrismaService } from 'libs';
import { CustomerService } from './services/customer.service';

@Module({
  imports: [JWTModule],
  controllers: [CustomerController],
  providers: [PrismaService, CustomerRepository, CustomerService],
})
export class CustomerModule {}
