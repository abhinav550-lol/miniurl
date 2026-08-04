import logger from "../utils/logger.js";

const errorMiddleware = (err, req, res, next) => {
	if (!err.statusCode) err.statusCode = 500;
	if (!err.status) err.status = "error";
	if (!err.message) err.message = "Something went wrong.";

	logger.error(err);
	if (process.env.NODE_ENV === "development") {
		return res.status(err.statusCode).json({
			success: false,
			status: err.status,
			message: err.message,
			stack: err.stack,
		});
	} else {
		return res.status(err.statusCode).json({
			success: false,
			message: err.message,
		});
	}


	return res.status(500).json({
		success: false,
		message: "Something went wrong.",
	});
};

export default errorMiddleware;