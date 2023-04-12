import { dev, production } from "./loggers";

const initializeLogger = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return production;

    case "development":
      return dev;

    default:
      return production;
  }
};

let logger = initializeLogger();

export default logger;
