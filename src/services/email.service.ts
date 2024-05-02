import 	nodemailer from 'nodemailer';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
  }

export class EmailService {

    private transporter: nodemailer.Transporter;

    constructor(mailerService: string,
        mailerEmail: string,
        senderPassword: string) {

        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: senderPassword,
            }
        })
    }

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody} = options;

        try {
            await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
            });
            
            return true;
            
        } catch (error) {
            console.log(error);
            return false;
        }  
    }

}