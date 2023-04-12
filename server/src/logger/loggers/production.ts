import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize, json } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

const logger = createLogger({
  level: "warning",
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
    new transports.File({
      filename: "combined.log",
    }),
  ],
});

export default logger;
