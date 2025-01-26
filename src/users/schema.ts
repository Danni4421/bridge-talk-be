import { pgTable } from 'drizzle-orm/pg-core';

export const users = pgTable('users', (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  username: t.varchar({ length: 50 }).notNull().unique(),
  email: t.varchar({ length: 100 }).notNull().unique(),
  password: t.text().notNull(),
  created_at: t.timestamp().notNull().defaultNow(),
  updated_at: t.timestamp(),
}));
