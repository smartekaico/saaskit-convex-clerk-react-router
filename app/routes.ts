import { type RouteConfig, route, index, layout } from '@react-router/dev/routes';

export default [
  index('./landing.tsx'),
  route('sign-in', './signin.tsx'),
  route('sign-up', './signup.tsx'),
  route('pricing', './pricing.tsx'),
  route('app/*', './app.tsx'),
] satisfies RouteConfig;
