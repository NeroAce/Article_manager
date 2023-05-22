import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma.service';

@Injectable()
export class OtpRepository {
  constructor(private prisma: PrismaService) {}

  async getOneOtp(otp: string) {
    return this.prisma.otp.findFirst({ where: { otp: otp } });
  }

  generateOTP(length) {
    const charset = '0123456789';
    let otp = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      otp += charset[randomIndex];
    }

    return otp;
  }

  async saveOtp(userId: number, otp: string, exp: number) {
    const currentDateTime = new Date();
    const dateAfterSomeMinutes = new Date();
    dateAfterSomeMinutes.setMinutes(dateAfterSomeMinutes.getMinutes() + exp);
    return this.prisma.otp.create({
      data: {
        userId: userId,
        otp: otp,
        createdDate: currentDateTime,
        expireDate: dateAfterSomeMinutes,
      },
    });
  }
}
