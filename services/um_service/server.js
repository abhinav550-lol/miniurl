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
	res.status(200).json({ message: "User Management Service is healthy" })
})

//Routes
import authRoutes from "./routes/authRoutes.js";	

app.use("/api/v1/auth" , authRoutes);



//Errors
app.use(errorMiddleware);


const PORT = process.env.PORT || 6001;
app.listen(PORT , () => {
	logger.info(`User Management Service is running on port ${PORT}`);
})