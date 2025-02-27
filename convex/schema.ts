import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
    points: v.number(),
    joinedAt: v.number(),
  }),
  activities: defineTable({
    userId: v.id("users"),
    category: v.string(), // "forest_conservation", "water_protection", "clean_energy", "sustainable_living"
    title: v.string(),
    description: v.string(),
    points: v.number(),
    imageUrl: v.optional(v.string()),
    location: v.optional(v.string()),
    timestamp: v.number(),
    verified: v.boolean(),
  }),
  leaderboard: defineTable({
    userId: v.id("users"),
    totalPoints: v.number(),
    rank: v.number(),
    lastUpdated: v.number(),
  }),
});