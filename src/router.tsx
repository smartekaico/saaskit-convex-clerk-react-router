import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

// Simple placeholder components
const LandingPage = () => <div className="p-8">Landing Page</div>;
const SignInPage = () => <div className="p-8">Sign In Page</div>;
const SignUpPage = () => <div className="p-8">Sign Up Page</div>;
const PricingPage = () => <div className="p-8">Pricing Page</div>;
const DashboardPage = () => <div className="p-8">Dashboard Page</div>;
const ProfilePage = () => <div className="p-8">Profile Page</div>;

// Layout component
const RootLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <nav className="flex gap-4 mb-8">
          <a href="/" className="text-blue-600 hover:underline">Home</a>
          <a href="/pricing" className="text-blue-600 hover:underline">Pricing</a>
          <a href="/sign-in" className="text-blue-600 hover:underline">Sign In</a>
          <a href="/sign-up" className="text-blue-600 hover:underline">Sign Up</a>
          <a href="/dashboard" className="text-blue-600 hover:underline">Dashboard</a>
        </nav>
        <div id="route-outlet" />
      </div>
      <TanStackRouterDevtools />
    </div>
  );
};

// Define routes
const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sign-in',
  component: SignInPage,
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sign-up',
  component: SignUpPage,
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pricing',
  component: PricingPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  signInRoute,
  signUpRoute,
  pricingRoute,
  dashboardRoute,
  profileRoute,
]);

export const router = createRouter({
  routeTree,
  basepath: '/',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}