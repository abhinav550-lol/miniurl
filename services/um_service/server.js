import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet"
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http"
import logger from "./utils/logger.js";


dotenv.config();

const app = express();

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

const PORT = process.env.PORT || 6001;

app.get("/health" , (req , res) => {
	logger.info("Health check endpoint called");
	res.status(200).json({ message: "User Management Service is healthy" })
})

app.listen(PORT , () => {
	logger.info(`User Management Service is running on port ${PORT}`);
})