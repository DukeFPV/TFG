import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env' });

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});



// import { config } from 'dotenv';
// import { defineConfig } from 'drizzle-kit';

// config({ path: './.env.local' });

// export default defineConfig({
//   schema: './src/lib/db/schema/*',
//   out: './migrations',
//   dialect: 'turso',
//   dbCredentials: {
//     url: process.env.DATABASE_URL!,
//     authToken: process.env.DATABASE_AUTH_TOKEN!,
//   },
// });