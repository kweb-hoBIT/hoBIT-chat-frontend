import type { NextConfig } from "next";
import { envKeys } from "./src/types/env.types";

envKeys.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} is not defined.`);
  }
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
