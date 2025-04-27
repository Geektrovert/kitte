import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { env } from "@/env/server";
import { env as clientEnv } from "@/env/client";
import db from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  trustedOrigins: [clientEnv.NEXT_PUBLIC_BETTER_AUTH_URL],
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [nextCookies()],
});
