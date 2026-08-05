import { z } from "zod";

const urlValidator = {};

urlValidator.createShortURLSchema = z.object({
	body: z.object({})
});

urlValidator.setCustomAliasSchema = z.object({
	body: z.object({}),
	params: z.object({})
});

urlValidator.getUserShortURLsSchema = z.object({
	query: z.object({})
});

urlValidator.getShortURLDetailsSchema = z.object({
	params: z.object({})
});

urlValidator.updateLongURLSchema = z.object({
	body: z.object({}),
	params: z.object({})
});

urlValidator.deleteShortURLSchema = z.object({
	params: z.object({})
});

export { urlValidator };