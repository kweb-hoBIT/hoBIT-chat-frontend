import type { EnvKeys } from "./env.types";

declare global {
  declare namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends Record<EnvKeys, string> {}
  }
}
