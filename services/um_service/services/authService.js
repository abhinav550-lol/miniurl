import prisma from "../config/prisma.js";
import {appError} from "../error/appError.js";
import bcrypt from "bcrypt";
import {createSignedToken} from "../utils/jwt.js";
class authService {
	async startUserRegisteration({email , password , confirmPassword}) {
		if(password !== confirmPassword) {
			throw new appError(400 , "Passwords do not match.");
		}

		const existingUser = await prisma.user.findUnique({
			where: {
				email: email
			}
		});

		if(existingUser) {
			throw new appError(400 , "User with this email already exists.");
		}

		const hashPassword = await bcryptHash(password);

		await sendOTP(email);

		const token = await createSignedToken({email , hashPassword} , "10m");

		return res.status(200).json({
			success : true,
			message : "OTP send successfully to your email. Please verify to complete registration.",
			userToken : token 
		})

	}

	async loginUser({email , password}) {
	
	}

	async logoutUser() {

	}

	async getMe(userId) {

	}
};

const authServiceInstance = new authService();
export {authServiceInstance as authService};