import { NODE_ENV } from "@/config";
import { dev, production } from "./loggers";

const initializeLogger = () => {
  switch (NODE_ENV) {
    case "production":
      return production;

    case "development":
      return dev;

    default:
      return dev;
  }
};

let logger = initializeLogger();

export default logger;
