import { ConvexReactClient } from 'convex/react';

// Provide your Convex deployment URL
const address = import.meta.env.VITE_CONVEX_URL || 'http://localhost:3000';

if (!address) {
  throw new Error('Missing VITE_CONVEX_URL environment variable');
}

export const convex = new ConvexReactClient(address);
