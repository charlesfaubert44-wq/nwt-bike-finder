# Quick Start Guide

Get the Yellowknife Trip Planner running on your local machine in 5 minutes.

## Prerequisites

Make sure you have installed:
- Node.js 18+ ([Download](https://nodejs.org/))
- PostgreSQL 14+ ([Download](https://www.postgresql.org/download/))
- Git ([Download](https://git-scm.com/))

## Setup Steps

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd yk-trip-planner

# Install all dependencies
npm install
```

### 2. Database Setup

```bash
# Create the database
createdb yk_trip_planner

# Copy environment files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

### 3. Configure Environment

Edit `apps/api/.env`:
```env
DATABASE_URL=postgresql://your_username@localhost:5432/yk_trip_planner
JWT_SECRET=your-secret-key-here
```

Edit `apps/web/.env`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Run Database Migrations

```bash
cd apps/api
npm run migrate
cd ../..
```

### 5. Start Development Servers

```bash
# Start all apps (web + api)
npm run dev
```

Or run them separately:
```bash
# Terminal 1 - API Server
npm run dev:api

# Terminal 2 - Web App
npm run dev:web
```

### 6. Open in Browser

- **Web App**: http://localhost:3000
- **API**: http://localhost:3001/health

## What's Next?

### Add Sample Data

```bash
cd apps/api
npm run seed
```

### Explore the Documentation

- [Development Guide](./docs/development-guide.md) - Detailed development instructions
- [API Endpoints](./docs/api-endpoints.md) - API documentation
- [Database Schema](./docs/database-schema.md) - Database structure

### Start Building

Check out the project structure:

```
apps/
  web/          → Next.js web app (http://localhost:3000)
  api/          → Express API server (http://localhost:3001)
  mobile/       → React Native mobile app

packages/
  types/        → Shared TypeScript types
  shared/       → Shared utilities
```

### Common Commands

```bash
# Development
npm run dev              # Run all apps
npm run dev:web          # Web app only
npm run dev:api          # API only
npm run dev:mobile       # Mobile app only

# Building
npm run build            # Build all apps
npm run build:web        # Build web app
npm run build:api        # Build API

# Testing
npm test                 # Run all tests
npm run lint             # Run linter
npm run format           # Format code

# Type checking
npm run type-check       # Check TypeScript types
```

## Troubleshooting

### Port Already in Use

If port 3000 or 3001 is already in use:
```bash
# Kill the process using the port
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### Database Connection Error

1. Ensure PostgreSQL is running:
   ```bash
   # macOS
   brew services start postgresql

   # Linux
   sudo service postgresql start

   # Windows
   # Start via Services or pg_ctl
   ```

2. Verify database exists:
   ```bash
   psql -l | grep yk_trip_planner
   ```

3. Check credentials in `apps/api/.env`

### Module Not Found

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Rebuild shared packages
cd packages/types && npm run build
cd ../shared && npm run build
```

## Mobile App Setup (Optional)

To run the mobile app:

```bash
# Install Expo CLI globally
npm install -g expo-cli

# Start the mobile app
npm run dev:mobile

# Follow the Expo instructions to:
# - Scan QR code with Expo Go app (iOS/Android)
# - Press 'a' for Android emulator
# - Press 'i' for iOS simulator (macOS only)
```

## Need Help?

- Check the [Development Guide](./docs/development-guide.md)
- Review [API Documentation](./docs/api-endpoints.md)
- Open an issue on GitHub

## Next Steps

1. **Explore the codebase**
   - Look at example components in `apps/web/src/components`
   - Review API routes in `apps/api/src/routes`

2. **Make your first change**
   - Try modifying the homepage in `apps/web/src/app/page.tsx`
   - Add a new API endpoint

3. **Learn the stack**
   - [Next.js Docs](https://nextjs.org/docs)
   - [Express.js Guide](https://expressjs.com/)
   - [TypeScript Handbook](https://www.typescriptlang.org/docs/)

Happy coding!
