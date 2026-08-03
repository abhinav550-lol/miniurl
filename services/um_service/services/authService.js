import prisma from "../config/prisma.js";
import {appError} from "../error/appError.js";
import {decodeToken} from "../utils/jwt.js";
import bcrypt from "bcrypt";
import {createSignedToken} from "../utils/jwt.js";
import {bcryptHash} from "../utils/bcrypt.js";
import logger from "../utils/logger.js";
import {otpService} from "../services/otpService.js";
class authService {
	async startUserRegistration({email , password , confirmPassword}) {
		try {
			if(password !== confirmPassword) {
				throw new appError(400 , "Passwords do not match.");
			}

			const existingUser = await prisma.users.findUnique({
				where: {
					email: email
				}
			});

			if(existingUser) {
				throw new appError(400 , "User with this email already exists.");
			}

			const hashPassword = await bcryptHash(password);

			await otpService.sendOTPviaMail(otpService.getKey(email) , email);

			const token = await createSignedToken({email , hashPassword} , "10m");

			return {
				success : true,
				message : "OTP send successfully to your email. Please verify to complete registration.",
				registerToken : token 
			}
		} catch (error) {
			logger.error(`Error in startUserRegisteration: ${error.message}`);
			throw error;
		}
	}

	async registerUser({registerToken , otp}){
		try {
			const decodedData = await decodeToken(registerToken);
			const {email , hashPassword} = decodedData;

			const isValidOTP = await otpService.verifyOTP(otpService.getKey( email) , otp);

			if(!isValidOTP) {
				throw new appError(400 , "Invalid OTP.");
			}

			const newUser = await prisma.users.create({
				data : {
					email : email,
					password : hashPassword
				}
			});

			return {
				success : true,
				message : "User registered successfully.",
				user : {
					id : newUser.id,
					email : newUser.email
				}
			}
		} catch(error){
			logger.error(`Error in registerUser: ${error.message}`);
			throw error;
		}
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