import { integer, varchar, pgTable, serial, text, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";

// Campus members table
export const Members = pgTable("members", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Waste reports table
export const WasteReports = pgTable("waste_reports", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").references(() => Members.id).notNull(),
  location: text("location").notNull(),
  wasteType: varchar("waste_type", { length: 255 }).notNull(),
  amount: varchar("amount", { length: 255 }).notNull(),
  imageUrl: text("image_url"),
  verificationResult: jsonb("verification_result"),
  status: varchar("status", { length: 255 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  collectorId: integer("collector_id").references(() => Members.id),
});

// Rewards table
export const Rewards = pgTable("rewards", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").references(() => Members.id).notNull(),
  points: integer("points").notNull().default(0),
  level: integer("level").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isAvailable: boolean("is_available").notNull().default(true),
  description: text("description"),
  name: varchar("name", { length: 255 }).notNull(),
  collectionInfo: text("collection_info").notNull(),
});

// Processed wastes table
export const ProcessedWastes = pgTable("processed_wastes", {
  id: serial("id").primaryKey(),
  reportId: integer("report_id").references(() => WasteReports.id).notNull(),
  collectorId: integer("collector_id").references(() => Members.id).notNull(),
  collectionDate: timestamp("collection_date").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("processed"),
});

// Alerts table
export const Alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").references(() => Members.id).notNull(),
  message: text("message").notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// EcoPoints transactions table
export const EcoTransactions = pgTable("eco_transactions", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").references(() => Members.id).notNull(),
  type: varchar("type", { length: 20 }).notNull(), // 'earned' or 'redeemed'
  amount: integer("amount").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").defaultNow().notNull(),
});