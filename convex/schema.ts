import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    createdAt: v.number(),
    subscriptionStatus: v.union(
      v.literal("free"),
      v.literal("active"),
      v.literal("past_due"),
      v.literal("canceled")
    ),
    subscriptionTier: v.union(
      v.literal("free"),
      v.literal("pro"),
      v.literal("enterprise")
    ),
    subscriptionId: v.optional(v.string()),
    currentPeriodEnd: v.optional(v.number()),
  }).index("by_clerk_id", ["clerkId"]),

  subscriptions: defineTable({
    userId: v.id("users"),
    clerkId: v.string(),
    subscriptionId: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("past_due"),
      v.literal("canceled"),
      v.literal("unpaid")
    ),
    tier: v.union(v.literal("free"), v.literal("pro"), v.literal("enterprise")),
    currentPeriodStart: v.number(),
    currentPeriodEnd: v.number(),
    cancelAtPeriodEnd: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user_id", ["userId"]).index("by_subscription_id", ["subscriptionId"]),

  usage: defineTable({
    userId: v.id("users"),
    clerkId: v.string(),
    month: v.string(), // YYYY-MM format
    apiCalls: v.number(),
    storage: v.number(), // in bytes
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user_month", ["userId", "month"]).index("by_clerk_id", ["clerkId"]),
});