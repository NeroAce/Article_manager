import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateCustomerDto,
  CreateUserDto,
  CustomerRepository,
  MailerRepository,
  OtpRepository,
  PrismaService,
  UserRepository,
} from 'libs';
import { LoginDto } from '../models/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ForgetPasswordDto } from '../models/forget-password.dto';

import { ChangePasswordDto } from '../models/change-password.dto';
import { ResetPasswordDto } from '../models/reset-password.dto';
import { SignupDto } from '../models/signup.dto';
import { RoleRepository } from 'libs/repositories/role.repository';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private mail: MailerRepository,
    private otp: OtpRepository,
    private customer: CustomerRepository,
    private role: RoleRepository,
  ) {}

  async signUp(data: SignupDto) {
    const userData = {
      username: data.emailid || '',
      passwordhash: data.password || '',
      securitystamp: data.securitystamp || '',
    };

    const customer = await this.customer.findByEmail(data.emailid);

    if (!customer) {
      delete data.password;
      const role = await this.role.getByName(data.role);
      if (role) {
        const user = await this.userRepository.createUser(userData);
        if (user) {
          const userid = user.id;
          data.userid = userid;
          const userRole = await this.role.createUserRole(role.id, user.id);
          delete data.role;
          const sendData = await this.customer.createCustomers(data);
          if (sendData) {
            const token = await this.jwtToken(userid);
            console.log(userRole);
            return {
              code: '200',
              message: '',
              status: 'success',
              data: token,
            };
          } else {
            throw new InternalServerErrorException('unable to create customer');
          }
        }
      } else {
        throw new NotFoundException('Role is not valid');
      }
    }
    throw new BadRequestException('user Already exists with this email id');
  }

  async logIn(data: LoginDto) {
    const findUser = await this.userRepository.getUserByEmail(data.username);
    console.log(findUser);
    if (findUser) {
      const isMatch = await this.comparePasswords(
        data.password,
        findUser.passwordhash,
      );
      if (isMatch) {
        const token = await this.jwtToken(findUser.id);
        if (token) {
          return {
            code: '200',
            message: '',
            status: 'success',
            data: token,
          };
        } else {
          throw new InternalServerErrorException('token not generated');
        }
      } else {
        throw new BadRequestException('Wrong Password');
      }
    } else {
      throw new BadRequestException('User Not Found');
    }
  }

  async forgetPassword(data: ForgetPasswordDto) {
    const find = await this.userRepository.getUserByEmail(data.email);
    const otp = await this.otp.generateOTP(6);
    if (otp) {
      if (find) {
        const to = data.email;
        const subject = 'OTP For Article Manager';
        const content = `this is your otp ${otp}`;

        const mailStatus = await this.mail.sendMail(to, subject, content);
        await this.otp.saveOtp(find.id, otp, 10);
        return {
          code: '200',
          message: 'otp send successfully! Check your email',
          status: 'success',
          data: {},
        };
      } else {
        throw new NotFoundException('User not found');
      }
    } else {
      throw new InternalServerErrorException('Unable To create otp');
    }
  }

  async resetPassword(data: ResetPasswordDto) {
    const find = await this.otp.getOneOtp(data.otp);
    const user = find
      ? await this.userRepository.getUserById(find.userId)
      : null;
    console.log(find);
    const currentDateTime = new Date();

    if (find) {
      if (user && data.email == user.username) {
        if (currentDateTime < find.expireDate) {
          return {
            code: '200',
            message: 'verified!',
            status: 'success',
            data: {},
          };
        } else {
          throw new BadRequestException('otp expired');
        }
      } else {
        throw new BadRequestException('OTP does not match with this user');
      }
    } else {
      throw new BadRequestException('Invalid OTP');
    }
  }

  async changePassword(data: ChangePasswordDto) {
    const find = await this.userRepository.getUserByEmail(data.email);

    if (find) {
      const status = await this.userRepository.changePassword(
        find.id,
        data.password,
      );
      if (status) {
        return {
          code: '200',
          message: '',
          status: 'success',
          data: status,
        };
      } else {
        throw new InternalServerErrorException('Unable to change password');
      }
    } else {
      throw new BadRequestException('User not found');
    }
  }

  async refreshToken(id) {
    try {
      const newId = parseInt(id);
      const find = await this.userRepository.getUserById(newId);
      const token = await this.jwtToken(find.id);
      return {
        code: '200',
        message: '',
        status: 'success',
        data: { refresh_token: token.access_token },
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  ///////////////////////////////////////////////HELPER FUNCTION///////////////////////////////////////////

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
  }

  async jwtToken(id) {
    const payload = { id: id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
