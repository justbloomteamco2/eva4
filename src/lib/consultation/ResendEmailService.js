import { Resend } from "resend";
export class ResendEmailService {
    from;
    to;
    resend;
    constructor(apiKey, from, to) {
        this.from = from;
        this.to = to;
        this.resend = new Resend(apiKey);
    }
    async sendEmail(message) {
        const { error } = await this.resend.emails.send({
            from: this.from,
            to: [this.to],
            replyTo: message.replyTo,
            subject: message.subject,
            text: message.text,
        });
        if (error) {
            throw new Error(`Resend email delivery failed: ${error.message}`);
        }
    }
}
