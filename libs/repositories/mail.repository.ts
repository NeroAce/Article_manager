import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerRepository {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  }

  async sendMail(to: string, subject: string, content: string): Promise<void> {
    return await this.transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text: content,
    });
  }
}
