import { ZodError } from "zod";

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      req.body = validatedData.body;
      req.params = validatedData.params;
      req.query = validatedData.query;

      next();
    } catch (err) {
		if (err instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Schema validation failed",
          errors: err.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
      next(err);
    }
  };
};

export { validate };