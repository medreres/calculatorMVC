declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URL: string;
      SERVER_PORT: string;
    }
  }
}
