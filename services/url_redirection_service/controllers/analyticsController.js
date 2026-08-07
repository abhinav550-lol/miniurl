import { wrapAsyncErrors } from "../error/wrapAsyncErrors.js";

const analyticsController = {}

analyticsController.getYearlyAnalytics = wrapAsyncErrors(async (req , res , next) => {

})

analyticsController.getMonthlyAnalytics = wrapAsyncErrors(async (req , res , next) => {
	
})

analyticsController.getTotalAnalytics = wrapAsyncErrors(async (req , res , next) => {
	
})

export {analyticsController} ;