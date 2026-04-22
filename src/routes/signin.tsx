import { Link } from 'react-router';

export const meta = () => [{ title: 'Sign In - SaaS Kit' }];

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign In</h1>
          <p className="text-muted-foreground mt-2">
            Enter your credentials to access your account
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full h-10 px-3 py-2 border rounded-md bg-background"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full h-10 px-3 py-2 border rounded-md bg-background"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full h-10 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm">
          Do not have an account?{' '}
          <Link to="/sign-up" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
