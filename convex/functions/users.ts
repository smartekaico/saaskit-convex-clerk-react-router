import { mutation, query } from './_generated/server';

export const getUser = query(async (ctx) => {
  const clerkId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
  if (!clerkId) return null;

  const user = await ctx.db
    .query('users')
    .withIndex('by_clerk_id', (q) => q.eq('clerkId', clerkId))
    .unique();

  return user;
});

export const createUser = mutation(async (ctx) => {
  const clerkId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
  const email = (await ctx.auth.getUserIdentity())?.email;

  if (!clerkId || !email) {
    throw new Error('Missing clerkId or email');
  }

  const existingUser = await ctx.db
    .query('users')
    .withIndex('by_clerk_id', (q) => q.eq('clerkId', clerkId))
    .unique();

  if (existingUser) return existingUser;

  const user = await ctx.db.insert('users', {
    clerkId,
    email,
    createdAt: Date.now(),
    subscriptionStatus: 'free',
    subscriptionTier: 'free',
  });

  return user;
});

export const updateSubscription = mutation(
  async (
    ctx,
    args: {
      clerkId: string;
      subscriptionStatus: 'free' | 'active' | 'past_due' | 'canceled';
      subscriptionTier: 'free' | 'pro' | 'enterprise';
      subscriptionId?: string;
      currentPeriodEnd?: number;
    }
  ) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', args.clerkId))
      .unique();

    if (!user) {
      throw new Error('User not found');
    }

    await ctx.db.patch(user._id, {
      subscriptionStatus: args.subscriptionStatus,
      subscriptionTier: args.subscriptionTier,
      subscriptionId: args.subscriptionId,
      currentPeriodEnd: args.currentPeriodEnd,
    });
  }
);
