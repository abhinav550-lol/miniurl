import jwt from "jsonwebtoken";
import { appError } from "../error/appError.js";

function createSignedToken(payload , time="0d"){
	const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: time === "0d" ? process.env.JWT_EXPIRES_IN : time});
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