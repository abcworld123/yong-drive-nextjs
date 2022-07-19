declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
    }
  }
  type Override<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
}

export {};
