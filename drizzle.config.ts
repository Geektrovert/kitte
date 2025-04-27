import { defineConfig } from "drizzle-kit";
import { env } from "@/env/server";

export default defineConfig({
  out: "./src/db/drizzle",
  dialect: "postgresql",
  schema: "./src/db/schema.ts",

  // driver: "pglite",
  dbCredentials: {
    url: env.DATABASE_URL,
  },

  schemaFilter: "public",
  tablesFilter: "*",

  strict: true,
  verbose: true,
});
