# SaaS Kit - React 19 + React Router 7 + Convex + Clerk

A complete, production-ready SaaS starter kit built with modern technologies. Perfect for quickly launching your next SaaS application with authentication, subscriptions, and a professional UI.

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, React Router 7
- **UI**: Shadcn/ui + TailwindCSS
- **Backend**: Convex (real-time database & functions)
- **Authentication**: Clerk (with subscription support)
- **Build Tool**: Vite
- **Icons**: Lucide React

## ✨ Features

- ✅ **Modern React 19** with latest features
- ✅ **Type-safe routing** with React Router 7
- ✅ **Beautiful UI** with Shadcn/ui components
- ✅ **Authentication** with Clerk
- ✅ **Real-time backend** with Convex
- ✅ **Subscription management** ready
- ✅ **Responsive design** for all devices
- ✅ **Professional landing page**
- ✅ **Dashboard with analytics**
- ✅ **Pricing page** with multiple tiers
- ✅ **User profile management**

## 🏁 Quick Start

### Prerequisites

- Node.js 18+
- bun
- Clerk account (free)
- Convex account (free)

### 1. Clone & Install

```bash
git clone <your-repo>
cd saas-kit-react-convex-clerk
bun install
```

### 2. Environment Setup

Copy the environment template:

```bash
cp .env.example .env
```

Fill in your environment variables in `.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here
CONVEX_DEPLOYMENT=your-deployment-name
```

### 3. Set Up Clerk

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy your publishable key to `.env`
4. Configure your sign-in/sign-up redirect URLs:
   - Sign-in: `http://localhost:5173/sign-in`
   - Sign-up: `http://localhost:5173/sign-up`

### 4. Set Up Convex

```bash
npx convex dev
```

This will:

- Login/connect to your Convex account
- Create a new project
- Generate necessary files
- Start the development server

Follow the prompts to complete the setup.

### 5. Start Development

```bash
bun run dev
```

Your app will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn/ui components
│   └── layout/          # Layout components (Header, etc.)
├── pages/
│   ├── auth/            # Authentication pages
│   ├── dashboard.tsx    # User dashboard
│   ├── landing.tsx      # Landing page
│   ├── pricing.tsx      # Pricing page
│   └── profile.tsx      # User profile
├── lib/
│   ├── utils.ts         # Utility functions
│   └── convex.ts        # Convex client
├── routes/             # React Router 7 routes
├── App.tsx              # Main app component
└── index.css            # Global styles & Tailwind

convex/
├── schema.ts            # Database schema
└── functions/           # Convex functions
    └── users.ts         # User management functions
```

## 🎨 Customization

### Styling

- Modify `tailwind.config.js` for theme customization
- Update CSS variables in `src/index.css`
- Add custom components in `src/components/ui/`

### Pages

- Edit existing pages in `src/pages/`
- Add new routes in `src/routes/`
- Update navigation in `src/components/layout/header.tsx`

### Database Schema

- Modify `convex/schema.ts` for your data model
- Add new functions in `convex/functions/`
- Run `npx convex dev` to apply changes

## 🔧 Available Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run preview      # Preview production build
bun run lint         # Run ESLint
```

## 🚀 Deployment

### Frontend (Vercel, Netlify, etc.)

1. Build your app: `bun run build`
2. Deploy the `dist` folder to your hosting platform
3. Set environment variables in your hosting platform
4. Update Clerk redirect URLs to your production domain

### Backend (Convex)

1. Convex automatically handles deployment
2. Your functions and schema are deployed when you run:
   ```bash
   npx convex deploy
   ```

## 🔐 Authentication & Security

### Clerk Configuration

- Set up proper redirect URLs in Clerk dashboard
- Configure OAuth providers if needed
- Set up webhook endpoints for production

### Protected Routes

The app includes basic authentication checks. For production:

1. Add route protection middleware
2. Implement proper role-based access
3. Set up CORS and security headers

## 💳 Subscriptions

### Setting Up Subscriptions

1. Enable Clerk Subscriptions in your dashboard
2. Create subscription products and prices
3. Configure webhook endpoints for subscription events
4. Implement subscription management in your app

### Webhook Configuration

Set up webhooks in Clerk to handle:

- `subscription.created`
- `subscription.updated`
- `subscription.deleted`
- `invoice.paid`

## 📝 Database Schema

The kit includes a complete schema for:

- **Users**: Profile information and subscription status
- **Subscriptions**: Subscription details and billing
- **Usage**: Track API calls and storage usage

You can extend this schema based on your needs.

## 🛠 Adding More UI Components

Add more Shadcn/ui components:

```bash
npx shadcn-ui@latest add button card input label
```

Or create custom components following the existing patterns in `src/components/ui/`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- 📚 [Clerk Documentation](https://clerk.com/docs)
- 📚 [Convex Documentation](https://docs.convex.dev)
- 📚 [React Router Documentation](https://reactrouter.com)
- 📚 [Shadcn/ui Documentation](https://ui.shadcn.com)

## 🎯 Next Steps

1. **Customize the branding** - Update colors, fonts, and logo
2. **Add your business logic** - Implement core features
3. **Set up analytics** - Add Google Analytics or similar
4. **Configure SEO** - Meta tags, sitemap, etc.
5. **Set up CI/CD** - Automated testing and deployment
6. **Add monitoring** - Error tracking and performance monitoring

---

**Built with ❤️ using modern web technologies. Ready to launch your SaaS!**
