import {sendMail} from "./mail.js";
import {setCacheData} from "../services/mail.js";

const OTP_EXPIRATION_TIME = 5 * 60; // 5 minutes

class otpService {
	generateOTP(){
		return Math.floor(100000 + Math.random() * 900000).toString();
	}

	async sendOTP(key , email , expiresIn=OTP_EXPIRATION_TIME) {
		const otp = generateOTP();
		
		await setCacheData(key , otp, expiresIn);

		await sendMail({
			to: email,
			subject: "Your OTP for MiniURL Registration",
			text: `Your OTP for MiniURL registration is ${otp}. It is valid for 5 minutes.`,
			html: `<p>Your OTP for MiniURL registration is <strong>${otp}</strong>. It is valid for 5 minutes.</p>`,
		});
	}
}