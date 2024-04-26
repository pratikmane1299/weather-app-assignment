import { createEnv } from "@t3-oss/env-core";
import * as z from 'zod';

export const env = createEnv({
  server: {
    OPEN_WEATHER_API_KEY: z.string(),
    UNSPLASH_API_KEY: z.string(),
  },
  runtimeEnvStrict: {
    OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
    UNSPLASH_API_KEY: process.env.UNSPLASH_API_KEY,
  },
});
