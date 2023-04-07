declare module "*.svg" {
  const content: string;
  export default content;
}

namespace NodeJS {
  interface ProcessEnv {
    BASE_URL: string;
  }
}
