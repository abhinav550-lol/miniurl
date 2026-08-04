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
			text: `Your OTP for MiniURL registration is ${otp}. It is valid for 5 minutes. Do not share this code with anyone.`,
			html: `
	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8" />
	</head>
	<body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">
	<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
		<tr>
		<td align="center">
			<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;padding:40px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">

			<tr>
				<td align="center">
				<h1 style="margin:0;color:#2563eb;font-size:28px;">
					MiniURL
				</h1>
				</td>
			</tr>

			<tr>
				<td style="padding-top:30px;">
				<h2 style="margin:0;color:#222;font-size:22px;">
					Verify your email
				</h2>

				<p style="margin:20px 0;color:#555;font-size:16px;line-height:1.6;">
					Thanks for signing up! Use the OTP below to complete your registration.
				</p>

				<div style="
					margin:30px 0;
					text-align:center;
					background:#f3f6ff;
					border:2px dashed #2563eb;
					border-radius:10px;
					padding:20px;
				">
					<span style="
					font-size:36px;
					font-weight:bold;
					letter-spacing:8px;
					color:#2563eb;
					">
					${otp}
					</span>
				</div>

				<p style="color:#555;font-size:15px;">
					This OTP is valid for <strong>5 minutes</strong>.
				</p>

				<p style="color:#d32f2f;font-size:14px;">
					Never share this OTP with anyone. MiniURL will never ask for your OTP.
				</p>

				<hr style="border:none;border-top:1px solid #eee;margin:30px 0;" />

				<p style="color:#888;font-size:13px;">
					If you didn't request this email, you can safely ignore it.
				</p>

				<p style="color:#888;font-size:13px;">
					— Team MiniURL
				</p>
				</td>
			</tr>

			</table>
		</td>
		</tr>
	</table>
	</body>
	</html>
			`,
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