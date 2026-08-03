import prisma from "../config/prisma.js";
import {appError} from "../error/appError.js";
import {decodeToken} from "../utils/jwt.js";
import bcrypt from "bcrypt";
import {createSignedToken} from "../utils/jwt.js";
import {bcryptHash , bcryptCompare} from "../utils/bcrypt.js";
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

			const token = await createSignedToken({id: newUser.id, email: newUser.email} , "7d");

			return {
				success : true,
				message : "User registered successfully.",
				userToken : token
			}
		} catch(error){
			logger.error(`Error in registerUser: ${error.message}`);
			throw error;
		}
	}

	async loginUser({email , password}) {
		try{
			const existingUser = await prisma.users.findUnique({
				where: {
					email: email
				}
			});

			if(!existingUser) {
				throw new appError(400 , "User with this email does not exist.");
			}

			const isPasswordValid = await bcryptCompare(password, existingUser.password);

			if(!isPasswordValid) {
				throw new appError(400 , "Invalid email or password.");
			}

			const token = await createSignedToken({id: existingUser.id, email: existingUser.email} , "7d");

			return {
				success : true,
				message : "User logged in successfully.",
				userToken : token
			};
		} catch (error) {
			logger.error(`Error in loginUser: ${error.message}`);
			throw error;
		}
	}
};

const authServiceInstance = new authService();
export {authServiceInstance as authService};