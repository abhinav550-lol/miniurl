import {wrapAsyncErrors} from "../error/wrapAsyncErrors.js";
import {appError} from "../error/appError.js";
import {urlService} from "../services/urlService.js";
import logger from "../utils/logger.js";
const urlController = {};

urlController.createShortURL = wrapAsyncErrors(async (req , res , next) => {
		const {longURL , isCustomAlias , customAlias} = req.body;
		const userId = req.user.id; 
	
		const response = await urlService.createShortURL({longURL , isCustomAlias , customAlias , userId});

		return res.status(201).json(response);
});

urlController.upsertCustomAlias = wrapAsyncErrors(async (req , res , next) => {
	const {shortCode} = req.params;
	const {customAlias} = req.body;
	const userId = req.user.id;
	
	const response = await urlService.upsertCustomAlias({shortCode , customAlias , userId});

	return res.status(200).json(response);
});

urlController.getUserShortURLs = wrapAsyncErrors(async (req , res , next) => {
	const userId = req.user.id;
	const response = await urlService.getUserShortURLs({userId});

	return res.status(200).json(response);
});

urlController.getShortURLDetails = wrapAsyncErrors(async (req , res , next) => {
	const {shortCode} = req.params;
	const userId = req.user.id;

	const response = await urlService.getShortURLDetails({shortCode , userId});

	return res.status(200).json(response);
});


urlController.updateLongURL = wrapAsyncErrors(async (req , res , next) => {
	const {shortCode} = req.params;
	const {newLongURL} = req.body;
	const userId = req.user.id;

	const response = await urlService.updateLongURL({shortCode , newLongURL , userId});

	return res.status(200).json(response);
});

urlController.deleteShortURL = wrapAsyncErrors(async (req , res , next) => {
	const {shortCode} = req.params;
	const userId = req.user.id;

	const response = await urlService.deleteShortURL({shortCode , userId});

	return res.status(200).json(response);
});

export {urlController};