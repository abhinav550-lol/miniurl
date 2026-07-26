import {appError} from "../error/appError.js";

class authService {
	async registerUser({email , password , confirmPassword}) {

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