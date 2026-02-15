import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getProfileByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();
    if (!user) return null;

    const followingCount = await ctx.db
      .query("friendships")
      .withIndex("by_requester", (q) => q.eq("requesterId", user._id))
      .filter((q) => q.eq(q.field("status"), "accepted"))
      .collect()
      .then((r) => r.length);

    const followersCount = await ctx.db
      .query("friendships")
      .withIndex("by_receiver", (q) => q.eq("receiverId", user._id))
      .filter((q) => q.eq(q.field("status"), "accepted"))
      .collect()
      .then((r) => r.length);

    const prs = await ctx.db
      .query("personalRecords")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const bestByExercise = new Map<string, number>();
    for (const pr of prs) {
      const key = pr.exercise.toLowerCase();
      bestByExercise.set(key, Math.max(bestByExercise.get(key) ?? 0, pr.weight));
    }

    const totalKg =
      (bestByExercise.get("bench press") ?? 0) +
      (bestByExercise.get("squat") ?? 0) +
      (bestByExercise.get("deadlift") ?? 0);

    return {
      ...user,
      followingCount,
      followersCount,
      totalKg,
    };
  },
});

export const seedBasicUser = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", "olifmov"))
      .first();
    if (existing) return existing._id;

    return await ctx.db.insert("users", {
      clerkId: "dev-clerk-olifmov",
      displayName: "oli",
      username: "olifmov",
      bio: "Gym enthusiast 💪",
      avatarUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      currentStreak: 5,
    });
  },
});