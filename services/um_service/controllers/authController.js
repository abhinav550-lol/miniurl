import {wrapAsyncErrors} from "../error/wrapAsyncErrors.js";
import {authService} from "../services/authService.js";
import {appError} from "../error/appError.js";


const authController = {};

const AUTH_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; 

authController.startUserRegistration = wrapAsyncErrors(async (req, res, next) => {
	const response = await authService.startUserRegistration(req.body);
	return res.status(200).json(response);
});


authController.registerUser = wrapAsyncErrors(async (req, res, next) => {
	const response = await authService.registerUser(req.body);	
	
	const {userToken} = response;
	if(!userToken) {
		throw new appError(500 , "Internal Server Error. User token not generated.");
	}

	res.cookie("userToken", userToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: AUTH_COOKIE_MAX_AGE,
	});

	return res.status(200).json(response);
});

authController.loginUser = wrapAsyncErrors(async (req, res, next) => {
	const response = await authService.loginUser(req.body);

	const {userToken} = response;
	if(!userToken) {
		throw new appError(500 , "Internal Server Error. User token not generated.");
	}

	res.cookie("userToken", userToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: AUTH_COOKIE_MAX_AGE,
	});

	return res.status(200).json(response);
});

authController.logoutUser = wrapAsyncErrors(async (req, res, next) => {
	res.clearCookie("userToken");
	return res.status(200).json({
		success: true,
		message: "User logged out successfully."
	});
});

authController.getUserDetails = wrapAsyncErrors(async (req, res, next) => {
	const userDetails = await authService.getUserDetails(req.user); //isLoggedIn middleware set req.user
	return res.status(200).json({
		success: true,
		data: userDetails
	});
});


export {authController};