import {appError} from "../error/appError.js";

class urlService {
	createShortURL({longURL , isCustomAlias , customAlias , userId}) {
		
	}

	getUserShortURLs({userId}) {

	}

	upsertCustomAlias({shortCode , customAlias , userId}) {

	}

	getShortURLDetails({shortCode}) {
		
	}

	updateLongURL({shortCode , newLongURL , userId}) {

	}

	deleteShortURL({shortCode , userId}){
		
	}
};

const urlServiceInstance = new urlService();
export { urlServiceInstance as urlService };