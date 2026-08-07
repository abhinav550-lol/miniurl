import { z } from "zod";

const redirectValidator = {};

redirectValidator.redirectUsingShortCodeSchema = z.object({
	body : z.object({

	}),
	query : z.object({
	}),
});

export { redirectValidator };