import  {pgTable, serial, text, date, timestamp, varchar, integer, pgEnum, boolean} from 'drizzle-orm/pg-core'

export const userSystemEnum = pgEnum('user_system_enum', ['user', 'system', 'assistant'])

export const chats = pgTable('chats', {
  id: serial('id').primaryKey(),
  pdfName: text('pdf_name').notNull(),
  pdfUrl: text('pdf_url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  userId: varchar('user_id', {length:256}).notNull(),
  fileKey: text('file_key').notNull(),
  isPublic: boolean('is_public').notNull().default(false),
})

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  chatId: integer('chat_id').references(() => chats.id).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  role: userSystemEnum('role').notNull(),
})

export const user_profiles = pgTable('user_profiles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  birthday: date('birthday'), 
  age: integer('age').notNull(),
  health: text('health').notNull(),
  bank: text('bank').notNull(),
  provincia: text('provincia').notNull(),
	genero: text('genero').notNull(),
	telefono: text('telefono').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type InsertChat = typeof chats.$inferInsert;
export type SelectChat = typeof chats.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;
export type SelectMessage = typeof messages.$inferSelect;
export type InsertUserProfile = typeof user_profiles.$inferInsert;
export type SelectUserProfile = typeof user_profiles.$inferSelect;