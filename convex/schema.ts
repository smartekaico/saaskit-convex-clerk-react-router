import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    role: v.union(v.literal('user'), v.literal('admin')),
    createdAt: v.number(),
    subscriptionStatus: v.union(
      v.literal('free'),
      v.literal('active'),
      v.literal('past_due'),
      v.literal('canceled')
    ),
    subscriptionTier: v.union(v.literal('free'), v.literal('pro'), v.literal('enterprise')),
    subscriptionId: v.optional(v.string()),
    currentPeriodEnd: v.optional(v.number()),
  })
    .index('by_clerk_id', ['clerkId'])
    .index('by_email', ['email'])
    .index('by_role', ['role'])
    .index('by_subscription_tier', ['subscriptionTier']),

  organizations: defineTable({
    clerkOrgId: v.string(),
    name: v.string(),
    slug: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_clerk_org_id', ['clerkOrgId'])
    .index('by_slug', ['slug']),

  subscriptions: defineTable({
    userId: v.id('users'),
    clerkId: v.string(),
    subscriptionId: v.string(),
    status: v.union(
      v.literal('active'),
      v.literal('past_due'),
      v.literal('canceled'),
      v.literal('unpaid')
    ),
    tier: v.union(v.literal('free'), v.literal('pro'), v.literal('enterprise')),
    currentPeriodStart: v.number(),
    currentPeriodEnd: v.number(),
    cancelAtPeriodEnd: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_user_id', ['userId'])
    .index('by_subscription_id', ['subscriptionId']),

  usage: defineTable({
    userId: v.id('users'),
    clerkId: v.string(),
    month: v.string(), // YYYY-MM format
    apiCalls: v.number(),
    storage: v.number(), // in bytes
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_user_month', ['userId', 'month'])
    .index('by_clerk_id', ['clerkId']),

  llm_configs: defineTable({
    userId: v.id('users'),
    clerkId: v.string(),
    name: v.string(),
    model: v.string(),
    systemPrompt: v.string(),
    temperature: v.number(),
    maxTokens: v.optional(v.number()),
    isDefault: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_user_id', ['userId'])
    .index('by_clerk_id', ['clerkId'])
    .index('by_user_default', ['userId', 'isDefault']),
});
