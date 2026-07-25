import pino from "pino";

const pinoConfig = {
  base: {
    service: "auth-service",
  },
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname,req.headers,res.headers",
	},
  },
};

export default pinoConfig;