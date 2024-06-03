import nodemailer from 'nodemailer';
import { ApiError } from '../exceptions/api-error';

class MailService {
  transport;
  constructor() {
    this.transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.smtp_user,
        pass: process.env.smtp_pass,
      },
    });
  }
  async sendActivationMail(to: string, identifier: string) {
    try {
      await this.transport.sendMail({
        from: `no-reply <${process.env.smtp_user}>`,
        to,
        subject: 'Account activation',
        html: `Follow this <a href="${process.env.CLIENT_URL}/email-confirmation/${identifier}">link</a> to verify your email address`,
      });
    } catch (error) {
      throw ApiError.ServerError('Internal Server Error');
    }
  }
}

export default new MailService();
