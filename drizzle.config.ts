import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production.local'
      : '.env.development.local',
  override: true,
});

export default defineConfig({
  schema: './src/**/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: process.env.NODE_ENV === 'production',
  },
});
