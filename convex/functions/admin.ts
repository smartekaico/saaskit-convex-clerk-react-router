import { paginationOptsValidator } from 'convex/server';
import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

// Admin query to list all users with pagination
export const listUsers = query({
  args: {
    paginationOpts: paginationOptsValidator,
    role: v.optional(v.union(v.literal('user'), v.literal('admin'))),
    subscriptionTier: v.optional(
      v.union(v.literal('free'), v.literal('pro'), v.literal('enterprise'))
    ),
  },
  handler: async (ctx, args) => {
    const { paginationOpts, role, subscriptionTier } = args;

    let q = ctx.db.query('users');

    // Apply filters if specified
    if (role) {
      q = q.withIndex('by_role', (q) => q.eq('role', role));
    } else if (subscriptionTier) {
      q = q.withIndex('by_subscription_tier', (q) => q.eq('subscriptionTier', subscriptionTier));
    } else {
      // Default to creation time order
      q = q.order('desc');
    }

    return q.paginate(paginationOpts);
  },
});

// Admin query to get single user by ID
export const getUserById = query({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get('users', args.userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },
});

// Admin query to get users count
export const getUsersCount = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('users').count();
  },
});

// List organizations with pagination
export const listOrganizations = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return ctx.db.query('organizations').order('desc').paginate(args.paginationOpts);
  },
});

// Admin mutation to update user role
export const updateUserRole = mutation({
  args: {
    userId: v.id('users'),
    role: v.union(v.literal('user'), v.literal('admin')),
  },
  handler: async (ctx, args) => {
    const { userId, role } = args;

    // Verify the user exists
    const user = await ctx.db.get('users', userId);
    if (!user) {
      throw new Error('User not found');
    }

    await ctx.db.patch(userId, { role });
    return user;
  },
});

// Admin mutation to delete user
export const deleteUser = mutation({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    const { userId } = args;

    // Verify the user exists
    const user = await ctx.db.get('users', args.userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Delete related records first
    const subscriptions = await ctx.db
      .query('subscriptions')
      .withIndex('by_user_id', (q) => q.eq('userId', userId))
      .collect();

    for (const sub of subscriptions) {
      await ctx.db.delete(sub._id);
    }

    const usageRecords = await ctx.db
      .query('usage')
      .withIndex('by_user_month', (q) => q.eq('userId', userId))
      .collect();

    for (const record of usageRecords) {
      await ctx.db.delete(record._id);
    }

    const llmConfigs = await ctx.db
      .query('llm_configs')
      .withIndex('by_user_id', (q) => q.eq('userId', userId))
      .collect();

    for (const config of llmConfigs) {
      await ctx.db.delete(config._id);
    }

    await ctx.db.delete(userId);
  },
});

// List LLM configs for a user
export const listLlmConfigs = query({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('llm_configs')
      .withIndex('by_user_id', (q) => q.eq('userId', args.userId))
      .collect();
  },
});

// Create LLM config
export const createLlmConfig = mutation({
  args: {
    name: v.string(),
    model: v.string(),
    systemPrompt: v.string(),
    temperature: v.number(),
    maxTokens: v.optional(v.number()),
    isDefault: v.boolean(),
  },
  handler: async (ctx, args) => {
    const clerkId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!clerkId) {
      throw new Error('Not authenticated');
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', clerkId))
      .unique();

    if (!user) {
      throw new Error('User not found');
    }

    // If this is set as default, unset other defaults
    if (args.isDefault) {
      const existingConfigs = await ctx.db
        .query('llm_configs')
        .withIndex('by_user_default', (q) => q.eq('userId', user._id).eq('isDefault', true))
        .collect();

      for (const config of existingConfigs) {
        await ctx.db.patch(config._id, { isDefault: false });
      }
    }

    const configId = await ctx.db.insert('llm_configs', {
      userId: user._id,
      clerkId,
      name: args.name,
      model: args.model,
      systemPrompt: args.systemPrompt,
      temperature: args.temperature,
      maxTokens: args.maxTokens,
      isDefault: args.isDefault,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return configId;
  },
});

// Update LLM config
export const updateLlmConfig = mutation({
  args: {
    configId: v.id('llm_configs'),
    name: v.optional(v.string()),
    model: v.optional(v.string()),
    systemPrompt: v.optional(v.string()),
    temperature: v.optional(v.number()),
    maxTokens: v.optional(v.number()),
    isDefault: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { configId, isDefault, ...updates } = args;

    const config = await ctx.db.get('llm_configs', configId);
    if (!config) {
      throw new Error('Config not found');
    }

    // If setting as default, unset other defaults
    if (isDefault) {
      const existingConfigs = await ctx.db
        .query('llm_configs')
        .withIndex('by_user_default', (q) => q.eq('userId', config.userId).eq('isDefault', true))
        .collect();

      for (const ec of existingConfigs) {
        if (ec._id !== configId) {
          await ctx.db.patch(ec._id, { isDefault: false });
        }
      }
    }

    await ctx.db.patch(configId, {
      ...updates,
      isDefault,
      updatedAt: Date.now(),
    });

    return config;
  },
});

// Delete LLM config
export const deleteLlmConfig = mutation({
  args: {
    configId: v.id('llm_configs'),
  },
  handler: async (ctx, args) => {
    const config = await ctx.db.get('llm_configs', args.configId);
    if (!config) {
      throw new Error('Config not found');
    }

    await ctx.db.delete(args.configId);
  },
});
