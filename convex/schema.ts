import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    displayName: v.string(),
    username: v.string(),
    bio: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    currentStreak: v.number(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_username", ["username"]),

  workouts: defineTable({
    userId: v.id("users"),
    name: v.string(),
    type: v.string(),
    location: v.optional(v.string()),
    photoUrl: v.optional(v.string()),
    mediaUrl: v.optional(v.string()),
    notes: v.optional(v.string()),
    rating: v.optional(v.number()),
    bodyWeight: v.optional(v.number()),
    caloriesBurned: v.optional(v.number()),
    startedAt: v.number(),
    completedAt: v.number(),
    isPublic: v.boolean(),
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
        type: v.string(),
        rpe: v.optional(v.number()),
        restSeconds: v.optional(v.number()),
      })
    ),
    order: v.number(),
  }).index("by_workout", ["workoutId"]),

  splits: defineTable({
    userId: v.id("users"),
    name: v.string(),
    type: v.string(),
    cycleLengthDays: v.number(),
    isActive: v.boolean(),
    startedAt: v.number(),
    endedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_user_active", ["userId", "isActive"]),

  personalRecords: defineTable({
    userId: v.id("users"),
    exercise: v.string(),
    weight: v.number(),
    achievedAt: v.number(),
    workoutId: v.optional(v.id("workouts")),
    notes: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_user_exercise", ["userId", "exercise"]),

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
