import jwt from "jsonwebtoken";
import { appError } from "../error/appError";

function createSignedToken(payload){
	const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
	return token;
}

function decodeToken(token){
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return decoded;
	} catch (error) {
		throw new AppError(401, "Invalid authentication token.");
	}
}

export { createSignedToken, decodeToken };