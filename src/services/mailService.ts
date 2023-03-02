import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";

class MailService {
  transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMPTP_HOST,
      port: process.env.SMPTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMPTP_USER,
        pass: process.env.SMPTP_PASSWORD,
      },
    } as SMTPTransport.Options);
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMPTP_USER,
      to,
      subject: "Активация аккаунта " + process.env.API_URL,
      text: "",
      html: `
					<div>
						<h1>Для активации перейдите по ссылке</h1>
						<a href='${link}'>${link}</a>
					</div>
				`,
    });
  }

  async sendMessageFromUser(email: string, theme: string, text: string) {
    await this.transporter.sendMail({
      from: email,
      to: process.env.SMPTP_USER,
      subject: `Тема: ${theme}`,
      text: text,
      html: `<div>From ${email}<br>${text}</div>`,
    });
  }
}

export const mailService = new MailService();
