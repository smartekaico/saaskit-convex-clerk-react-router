import { Link } from 'react-router';

export const meta = () => [{ title: 'Sign Up - SaaS Kit' }];

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-2">Get started with your free account</p>
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
            Create Account
          </button>
        </form>
        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/sign-in" className="underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
