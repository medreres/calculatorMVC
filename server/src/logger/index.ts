import winston, { createLogger, format, transports } from "winston";

import { NODE_ENV } from "@/config";
const { combine, timestamp, printf, colorize, json } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

const logger = createLogger({
  level: NODE_ENV === "production" ? "warning" : "info",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    colorize(),
    json(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new winston.transports.File({ filename: "./logs/errors.log", level: "error" }),
    new winston.transports.File({ filename: "./logs/warnings.log", level: "warning" }),
    new winston.transports.File({ filename: "./logs/info.log", level: "info" }),
  ],
});

export default logger;
