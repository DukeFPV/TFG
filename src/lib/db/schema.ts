// src/lib/db/schema.ts

import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core"

export const userSystemEnum = pgEnum("user_system_enum", [
  "user",
  "system",
  "assistant",
])

export const healthCenters = pgTable("health_centers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  region: text("region"),
  province: text("province"),
  municipality: text("municipality"),
  locality: text("locality"),
  address: text("address"),
  postalCode: text("postal_code"),
  phone: text("phone"),
  healthZone: text("health_zone"),
  healthArea: text("health_area"),
  managementType: text("management_type"),
  managementDependency: text("management_dependency"),
  centerType: text("center_type"),
  teachingAccreditation: boolean("teaching_accreditation"),
})

export const user_profiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  clerkUserId: varchar("clerk_user_id", { length: 256 }).notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  birthday: text("birthday"),
  age: integer("age").notNull(),
  health: text("health").notNull(),
  bank: text("bank").notNull(),
  provincia: text("provincia").notNull(),
  genero: text("genero").notNull(),
  telefono: text("telefono").notNull(),
  selectedHealthCenterId: integer("selected_health_center_id").references(
    () => healthCenters.id,
  ),
  currentStep: integer("current_step").default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const userHealthCenterSelections = pgTable(
  "user_health_center_selections",
  {
    id: serial("id").primaryKey(),
    clerkUserId: varchar("clerk_user_id", { length: 256 }).notNull(),
    healthCenterId: integer("health_center_id")
      .references(() => healthCenters.id)
      .notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
)

export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  pdfName: text("pdf_name").notNull(),
  pdfUrl: text("pdf_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  fileKey: text("file_key").notNull(),
  isPublic: boolean("is_public").notNull().default(false),
})

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatId: integer("chat_id")
    .references(() => chats.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  role: userSystemEnum("role").notNull(),
  image: text("image"), // Columna de imagen opcional
})

export type InsertChat = typeof chats.$inferInsert
export type SelectChat = typeof chats.$inferSelect
export type InsertMessage = typeof messages.$inferInsert
export type SelectMessage = typeof messages.$inferSelect
export type InsertUserProfile = typeof user_profiles.$inferInsert
export type SelectUserProfile = typeof user_profiles.$inferSelect
export type InsertHealthCenter = typeof healthCenters.$inferInsert
export type SelectHealthCenter = typeof healthCenters.$inferSelect
