import { z } from "zod";

const analyticsValidator = {};

analyticsValidator.yearlyAnalyticsSchema = z.object({
	body : z.object({

	}),
	query : z.object({
	}),
});

analyticsValidator.monthlyAnalyticsSchema = z.object({
	body : z.object({

	}),
	query : z.object({
	}),
});

analyticsValidator.totalAnalyticsSchema = z.object({
	body : z.object({

	}),
	query : z.object({
	}),
});

export { analyticsValidator };