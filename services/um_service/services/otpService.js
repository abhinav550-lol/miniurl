import {mailService} from "../services/mailService.js";
import {setCacheData, getCacheData, deleteCacheData} from "../utils/cache.js";
import {appError} from "../error/appError.js";

const OTP_EXPIRATION_TIME = 5 * 60; // 5 minutes

class otpService {
	generateOTP(){
		return Math.floor(100000 + Math.random() * 900000).toString();
	}

	getKey(item) {
		return `otp:${item}`;
	}

	async sendOTPviaMail(key , email , expiresIn=OTP_EXPIRATION_TIME) {
		const otp = this.generateOTP();
		
		await setCacheData(key , otp, expiresIn);

		await mailService.sendMail({
			to: email,
			subject: "Your OTP for MiniURL Registration",
			text: `Your OTP for MiniURL registration is ${otp}. It is valid for 5 minutes.`,
			html: `<p>Your OTP for MiniURL registration is <strong>${otp}</strong>. It is valid for 5 minutes.</p>`,
		});
	}

	async verifyOTP(key , otp){
		const cachedOTP = await getCacheData(key);

		if(!cachedOTP) {
			throw new appError(400 , "OTP has expired or is invalid.");
		}

		if(cachedOTP !== otp) {
			throw new appError(400 , "Invalid OTP.");
		}

		await deleteCacheData(key);
		return true;
	}
}

const otpServiceInstance = new otpService();
export {otpServiceInstance as otpService};