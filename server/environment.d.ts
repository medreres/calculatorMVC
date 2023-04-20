export {};

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      PORT: string;
      DB_URL: string;
      NODE_ENV: "production" | "development";
    }
  }
}
