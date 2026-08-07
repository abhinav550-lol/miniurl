import express from 'express'
import {analyticsController} from "../controllers/analyticsController.js";
import { validate } from "../middleware/validateMiddleware.js";
import { analyticsValidator } from "../validators/analyticsValidator.js";
import {isLoggedIn} from "../middleware/authMiddlewares.js";

const router = express.Router();

router.get('/:shortCode/yearly' , validate(analyticsValidator.yearlyAnalyticsSchema) , isLoggedIn , analyticsController.getYearlyAnalytics);

router.get('/:shortCode/monthly', validate(analyticsValidator.monthlyAnalyticsSchema) , isLoggedIn , analyticsController.getMonthlyAnalytics); 

router.get("/:shortCode/total", validate(analyticsValidator.totalAnalyticsSchema) , isLoggedIn , analyticsController.getTotalAnalytics);

export default router;
