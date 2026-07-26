import {wrapAsyncErrors} from "../error/wrapAsyncErrors.js";
import {authService} from "../services/authService.js";



const authController = {};

authController.registerUser = wrapAsyncErrors(async (req, res, next) => {
	const {} = await authService.registerUser(req.body);

	

});

authController.loginUser = wrapAsyncErrors( async (req, res, next) => {

});

authController.logoutUser = wrapAsyncErrors( async (req, res, next) => {

});

authController.getMe = wrapAsyncErrors( async (req, res, next) => {

});

export {authController};