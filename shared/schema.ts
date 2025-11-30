import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Film Proposals Schema
export const proposals = pgTable("proposals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  city: text("city").notNull(),
  venueHint: text("venue_hint"),
  targetDate: text("target_date"),
  votes: integer("votes").notNull().default(0),
  goal: integer("goal").notNull().default(500),
  rightsStatus: text("rights_status").notNull().default("unknown"),
  posterUrl: text("poster_url"),
  tags: text("tags").array(),
  synopsis: text("synopsis"),
  trailer: text("trailer"),
  duration: text("duration"),
  rightsNotes: text("rights_notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertProposalSchema = createInsertSchema(proposals).omit({
  id: true,
  votes: true,
  createdAt: true,
}).extend({
  slug: z.string().min(1, "Slug è richiesto"),
  title: z.string().min(1, "Titolo è richiesto"),
  city: z.string().min(1, "Città è richiesta"),
  goal: z.number().min(1).default(500),
  rightsStatus: z.enum(["known", "unknown", "special"]).default("unknown"),
  tags: z.array(z.string()).optional(),
});

export type InsertProposal = z.infer<typeof insertProposalSchema>;
export type Proposal = typeof proposals.$inferSelect;

// User Votes Tracking Schema
export const userVotes = pgTable("user_votes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  proposalId: varchar("proposal_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type UserVote = typeof userVotes.$inferSelect;

// Pre-bookings Schema
export const preBookings = pgTable("pre_bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  proposalId: varchar("proposal_id").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type PreBooking = typeof preBookings.$inferSelect;

// Blog Posts Schema
export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  coverImage: text("cover_image"),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  publishedAt: true,
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(1, "Nome è richiesto"),
  email: z.string().email("Email non valida"),
  message: z.string().min(10, "Il messaggio deve contenere almeno 10 caratteri"),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// Demo Request Form Schema
export const demoRequestSchema = z.object({
  name: z.string().min(1, "Nome è richiesto"),
  email: z.string().email("Email non valida"),
  cinemaNome: z.string().min(1, "Nome del cinema è richiesto"),
  città: z.string().min(1, "Città è richiesta"),
  message: z.string().optional(),
});

export type DemoRequest = z.infer<typeof demoRequestSchema>;

// Ambassador Form Schema
export const ambassadorFormSchema = z.object({
  name: z.string().min(1, "Nome è richiesto"),
  email: z.string().email("Email non valida"),
  città: z.string().min(1, "Città è richiesta"),
  motivation: z.string().min(20, "Racconta di più sulla tua motivazione (min 20 caratteri)"),
});

export type AmbassadorForm = z.infer<typeof ambassadorFormSchema>;

// Newsletter Schema
export const newsletterSchema = z.object({
  email: z.string().email("Email non valida"),
});

export type Newsletter = z.infer<typeof newsletterSchema>;

// User schema
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
}).extend({
  username: z.string().min(3, "Username deve avere almeno 3 caratteri"),
  password: z.string().min(6, "Password deve avere almeno 6 caratteri"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
