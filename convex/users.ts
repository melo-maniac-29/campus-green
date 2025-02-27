import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .first();
    
    if (existingUser) return existingUser._id;
    
    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      imageUrl: args.imageUrl,
      points: 0,
      joinedAt: Date.now(),
    });
    
    // Initialize leaderboard entry
    await ctx.db.insert("leaderboard", {
      userId,
      totalPoints: 0,
      rank: 0, // Will be updated by a separate job
      lastUpdated: Date.now(),
    });
    
    return userId;
  },
});

export const getUser = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .first();
  },
});

export const getTopUsers = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;
    
    const leaderboardEntries = await ctx.db
      .query("leaderboard")
      .order("desc", "totalPoints")
      .take(limit);
    
    // Fetch users for each leaderboard entry
    const users = await Promise.all(
      leaderboardEntries.map(async (entry) => {
        const user = await ctx.db.get(entry.userId);
        return {
          ...entry,
          user,
        };
      })
    );
    
    return users;
  },
});