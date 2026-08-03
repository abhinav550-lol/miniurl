import { z } from "zod";

const authValidator = {};

const isStrongPassword = (password) => {
	if(password.length < 6 || password.length > 20) {
		return false;
	}

	if(!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
		return false;
	}

	if(password.includes(" ")) {
		return false;
	}

	return true;
}


authValidator.startUserRegistrationSchema = z.object({
	body : z.object({
		email: z.string().email("Invalid email address"),
		password: z.string().refine(isStrongPassword, {
			message: "Password must be at least 6 characters long and include an uppercase letter, a number, and a special character and should not contain spaces"
		}),
		confirmPassword: z.string()
			.refine(isStrongPassword, {
				message: "Password must be at least 6 characters long and include an uppercase letter, a number, and a special character and should not contain spaces"
			})
	})
});

authValidator.registerUserSchema = z.object({
	body : z.object({
	registerToken : z.string().nonempty("Register token is required"),
	otp : z.string().length(6 , "OTP must be 6 digits long")
	})
});



export { authValidator };