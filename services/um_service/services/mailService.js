import transporter from "../config/nodemailer.js";

class mailService {
	async sendMail({ to, subject, html, text }) {
		await transporter.sendMail({
			from: process.env.SMTP_FROM,
			to,
			subject,
			text,
			html,
		});
	}
}


const mailServiceInstance = new mailService();

export { mailServiceInstance as mailService };