import { z } from "zod";

const authValidator = {};


authValidator.registerUserSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string()
		.min(6, "Password must be at least 6 characters long")
		.max(20, "Password must be at most 20 characters long"),
	confirmPassword: z.string()
		.min(6, "Confirm password must be at least 6 characters long")
		.max(20, "Confirm password must be at most 20 characters long"),
});





export { authValidator };