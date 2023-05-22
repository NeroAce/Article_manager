import { Module } from '@nestjs/common';
import {
  CustomerRepository,
  JWTModule,
  OtpRepository,
  PrismaService,
  UserRepository,
} from 'libs';
import { AuthController } from './controllers/auth.controllers';
import { AuthService } from './services/auth.services';
import { MailerRepository } from 'libs/repositories/mail.repository';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [JWTModule],
  controllers: [AuthController, UserController],
  providers: [
    UserRepository,
    MailerRepository,
    PrismaService,
    AuthService,
    OtpRepository,
    UserService,
    CustomerRepository,
  ],
})
export class AuthModule {}
