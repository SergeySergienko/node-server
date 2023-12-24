import nodemailer from 'nodemailer';

class MailService {
  transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({});
  }
  async sendActivationMail(to: string, link: string) {
    console.log(`Activation Email sent to ${to}`);
    // await this.transporter.sendMail({});
  }
}

export default new MailService();
