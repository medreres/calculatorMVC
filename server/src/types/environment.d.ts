export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: string;
      SERVER_PORT: string;  
    }
  }
}
