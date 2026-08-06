import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet"
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http"
import logger from "./utils/logger.js";
import {appError} from "./error/appError.js";	
import errorMiddleware from "./middleware/errorMiddleware.js";
dotenv.config();
const app = express();

//Configuration
app.use(cors({
	origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(
  pinoHttp({
    logger,
  })
);


app.get("/health" , (req , res) => {
	logger.info("Health check endpoint called");
	res.status(200).json({ message: "URL generation service is healthy" })
})

//Routes
import urlRoutes from "./routes/urlRoutes.js";

app.use("/api/v1/urls" , urlRoutes);

//Errors
app.use(errorMiddleware);


const PORT = process.env.PORT || 6002;
app.listen(PORT , () => {
	logger.info(`URL generation service is running on port ${PORT}`);
})