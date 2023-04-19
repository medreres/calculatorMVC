import { NODE_ENV } from "@/config";
import { createLogger, format, transports } from "winston";
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
  // TODO save to files
  transports: [new transports.Console()],
});

export default logger;
