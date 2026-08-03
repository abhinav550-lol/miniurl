import {wrapAsyncErrors} from "../error/wrapAsyncErrors.js";
import {authService} from "../services/authService.js";



const authController = {};

authController.startUserRegistration = wrapAsyncErrors(async (req, res, next) => {
	const response = await authService.startUserRegistration(req.body);
	return res.status(200).json(response);
});


authController.registerUser = wrapAsyncErrors(async (req, res, next) => {
	const response = await authService.registerUser(req.body);	
	return res.status(200).json(response);
});

authController.loginUser = wrapAsyncErrors( async (req, res, next) => {

});

authController.logoutUser = wrapAsyncErrors( async (req, res, next) => {

});

authController.getMe = wrapAsyncErrors( async (req, res, next) => {

});

export {authController};