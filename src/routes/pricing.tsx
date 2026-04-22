import { Link } from 'react-router';

export const meta = () => [{ title: 'Pricing - SaaS Kit' }];

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for getting started',
      features: ['Basic features', 'Up to 5 projects', 'Community support'],
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'For growing teams',
      features: ['All features', 'Unlimited projects', 'Priority support', 'Advanced analytics'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For large organizations',
      features: ['Everything in Pro', 'Custom integrations', 'Dedicated support', 'SLA guarantee'],
    },
  ];

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground">Choose the plan that fits your needs.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-6 border rounded-lg ${plan.popular ? 'border-primary shadow-lg' : ''}`}
            >
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="mt-2 flex items-baseline">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-1">{plan.period}</span>
              </div>
              <p className="text-muted-foreground mt-2">{plan.description}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm">
                    <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/sign-up"
                className="w-full mt-6 h-10 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center justify-center"
              >
                {plan.popular ? 'Get Started' : 'Choose Plan'}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
