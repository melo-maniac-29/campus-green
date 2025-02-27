import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Points for different activities
const POINTS_MAP = {
  "forest_conservation": 10,
  "water_protection": 8,
  "clean_energy": 12,
  "sustainable_living": 5,
};

export const logActivity = mutation({
  args: {
    userId: v.id("users"),
    category: v.string(),
    title: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    location: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get points based on category
    const points = POINTS_MAP[args.category as keyof typeof POINTS_MAP] || 5;
    
    // Log the activity
    const activityId = await ctx.db.insert("activities", {
      userId: args.userId,
      category: args.category,
      title: args.title,
      description: args.description,
      points,
      imageUrl: args.imageUrl,
      location: args.location,
      timestamp: Date.now(),
      verified: false, // Activities need verification by default
    });
    
    // Update user's points
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");
    
    await ctx.db.patch(args.userId, {
      points: user.points + points,
    });
    
    // Update leaderboard
    const leaderboardEntry = await ctx.db
      .query("leaderboard")
      .filter(q => q.eq(q.field("userId"), args.userId))
      .first();
      
    if (leaderboardEntry) {
      await ctx.db.patch(leaderboardEntry._id, {
        totalPoints: leaderboardEntry.totalPoints + points,
        lastUpdated: Date.now(),
      });
    }
    
    return { activityId, pointsEarned: points };
  },
});

export const getUserActivities = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("activities")
      .filter(q => q.eq(q.field("userId"), args.userId))
      .order("desc", "timestamp")
      .collect();
  },
});

export const getRecentActivities = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;
    
    const activities = await ctx.db
      .query("activities")
      .order("desc", "timestamp")
      .take(limit);
    
    // Fetch user for each activity
    return await Promise.all(
      activities.map(async (activity) => {
        const user = await ctx.db.get(activity.userId);
        return {
          ...activity,
          user,
        };
      })
    );
  },
});

export const getActivitiesByCategory = query({
  args: { category: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;
    
    return await ctx.db
      .query("activities")
      .filter(q => q.eq(q.field("category"), args.category))
      .order("desc", "timestamp")
      .take(limit);
  },
});