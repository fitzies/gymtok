import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    displayName: v.string(),
    username: v.string(),
    bio: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    benchMax: v.optional(v.string()),
    squatMax: v.optional(v.string()),
    deadliftMax: v.optional(v.string()),
    currentStreak: v.number(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_username", ["username"]),

  workouts: defineTable({
    userId: v.id("users"),
    name: v.string(),
    duration: v.number(),
    notes: v.optional(v.string()),
    mediaUrl: v.optional(v.string()),
    isPublic: v.boolean(),
    completedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_completedAt", ["completedAt"]),

  exercises: defineTable({
    workoutId: v.id("workouts"),
    name: v.string(),
    sets: v.array(
      v.object({
        reps: v.number(),
        weight: v.number(),
      })
    ),
    order: v.number(),
  }).index("by_workout", ["workoutId"]),

  friendships: defineTable({
    requesterId: v.id("users"),
    receiverId: v.id("users"),
    status: v.union(v.literal("pending"), v.literal("accepted")),
  })
    .index("by_requester", ["requesterId"])
    .index("by_receiver", ["receiverId"]),

  likes: defineTable({
    userId: v.id("users"),
    workoutId: v.id("workouts"),
  })
    .index("by_workout", ["workoutId"])
    .index("by_user_workout", ["userId", "workoutId"]),

  comments: defineTable({
    userId: v.id("users"),
    workoutId: v.id("workouts"),
    body: v.string(),
  }).index("by_workout", ["workoutId"]),
});
