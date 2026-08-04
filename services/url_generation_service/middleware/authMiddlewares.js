import { decodeToken } from "../utils/jwt.js";

const isLoggedIn = async (req, res, next) => {
	const token = req.cookies.userToken;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized. No token provided.",
		});
	}

	const decoded = await decodeToken(token);
	
	req.user = decoded;

	next();
}

export {isLoggedIn};