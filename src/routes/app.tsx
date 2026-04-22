import { Link, Outlet } from 'react-router';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-primary" />
            <span className="text-xl font-bold">SaaS Kit</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link to="/pricing" className="text-sm font-medium">
              Pricing
            </Link>
            <Link to="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
