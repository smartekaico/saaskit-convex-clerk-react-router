import { Link } from 'react-router';

export const meta = () => [
  { title: 'SaaS Kit - Build Faster' },
  {
    name: 'description',
    content: 'A complete SaaS starter kit with React 19, React Router 7, Convex, and Clerk.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Build Your SaaS Application
            <span className="text-primary block">Faster Than Ever</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A complete starter kit with React 19, React Router 7, Convex, and Clerk. Everything you
            need to launch your SaaS application quickly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/sign-up"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Get Started Free
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
