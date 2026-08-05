import {wrapAsyncErrors} from "../error/wrapAsyncErrors.js";
import {appError} from "../error/appError.js";
import {urlService} from "../services/urlService.js";
const urlController = {};

urlController.generateShortURL = wrapAsyncErrors(async (req , res , next) => {

})

urlController.setCustomAlias = wrapAsyncErrors(async (req , res , next) => {

})

urlController.getUserShortURLs = wrapAsyncErrors(async (req , res , next) => {

})

urlController.getShortURLDetails = wrapAsyncErrors(async (req , res , next) => {

})

urlController.updateLongURL = wrapAsyncErrors(async (req , res , next) => {

})

urlController.deleteShortURL = wrapAsyncErrors(async (req , res , next) => {

})

export {urlController};