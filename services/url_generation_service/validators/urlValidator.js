import { z } from "zod";


const isURLFriendlyCustomAlias = (alias) => {
	return /^[a-zA-Z0-9_-]+$/.test(alias)
}


const urlValidator = {};

urlValidator.createShortURLSchema = z.object({
	body: z.object({
		longURL: z.string().url({ message: "Invalid URL format" }),
		isCustomAlias: z.boolean().optional(),
		customAlias: z.string().nonempty({ message: "Custom alias cannot be empty" })
		.min(3 , { message: "Custom alias must be at least 3 characters long" })
		.max(20 , { message: "Custom alias must be at most 20 characters long" })
		.refine(isURLFriendlyCustomAlias, {message: "Custom alias can only contain alphanumeric characters, hyphens, and underscores"})
		.optional()
	})
});

urlValidator.upsertCustomAliasSchema = z.object({
	body: z.object({
		customAlias: z.string().nonempty({ message: "Custom alias cannot be empty" })
		.min(3 , { message: "Custom alias must be at least 3 characters long" })
		.max(20 , { message: "Custom alias must be at most 20 characters long" })
		.refine(isURLFriendlyCustomAlias, {
			message: "Custom alias can only contain alphanumeric characters, hyphens, and underscores"
		})
	}),
	params: z.object({
		shortCode: z.string().nonempty({ message: "Short code is required" })
	})
});

//urlValidator.getUserShortURLsSchema = z.object({

//});

urlValidator.getShortURLDetailsSchema = z.object({
	params: z.object({
		shortCode: z.string().nonempty({ message: "Short code is required" })
	})
});

urlValidator.updateLongURLSchema = z.object({
	body: z.object({
		newLongURL: z.string().url({ message: "Invalid URL format" })
	}),
	params: z.object({
		shortCode: z.string().nonempty({ message: "Short code is required" })
	})
});

urlValidator.deleteShortURLSchema = z.object({
	params: z.object({
		shortCode: z.string().nonempty({ message: "Short code is required" })
	})
});

export { urlValidator };