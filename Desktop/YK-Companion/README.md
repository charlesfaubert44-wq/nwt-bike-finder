# Yellowknife Trip Planner

A comprehensive web and mobile platform designed to solve the **real problems** tourists face when planning trips to Canada's North. Based on extensive tourism research, this platform addresses critical gaps in existing tourism resources.

## Why This Platform?

**The Problem:** Current Yellowknife tourism sites provide beautiful imagery but lack:
- ❌ Pricing transparency (no cost estimates anywhere)
- ❌ Booking integration (information-only gateways)
- ❌ Personalization (one-size-fits-all approach)
- ❌ Practical preparation guidance (extreme weather packing)
- ❌ Offline functionality (limited cell service in remote areas)

**Our Solution:** A practical, user-focused platform that actually helps visitors plan.

## Key Features (Research-Based)

### 🎯 Personalized Experience
- **Traveler Type Quiz**: Match visitors to one of three profiles (Relaxed, Curious Explorer, Adventurer)
- **Custom Recommendations**: Tailored activity suggestions and itineraries

### 💰 Cost Transparency
- **Trip Budget Calculator**: Realistic cost estimates with itemized breakdowns
- **Budget vs. Luxury Comparisons**: Understand trade-offs at different price points
- **Money-Saving Tips**: Local insights for budget-conscious travelers

### 📅 Smart Seasonal Planning
- **Month-by-Month Guide**: Temperature, daylight hours, crowd levels, aurora probability
- **Best Time For...**: Find optimal timing for specific activities
- **Event Calendar**: Never miss seasonal highlights

### 🎒 Preparation Tools
- **Smart Packing Lists**: Temperature-specific gear recommendations
- **Local Rental Options**: What to bring vs. what to rent
- **Extreme Cold Guides**: Survive -40°C safely and comfortably

### 🌌 Aurora Intelligence
- **Real-Time Forecasts**: KP Index, cloud cover, best viewing times
- **Smart Alerts**: Push notifications when conditions are ideal
- **Photography Tips**: Capture the northern lights

### 🏔️ Indigenous Cultural Respect
- **Cultural Protocol Guides**: Respectful engagement with Indigenous experiences
- **Verified Indigenous-Owned Businesses**: Support local communities
- **Educational Context**: Understand the significance of cultural activities

### 📱 Offline-First Mobile
- **Download for Offline**: Complete itineraries, maps, and activity details
- **Works Without Connection**: Critical for remote northern travel

## What Makes Us Different

| Current Tourism Sites | YK Trip Planner |
|----------------------|-----------------|
| No pricing | Complete cost transparency |
| Information only | Integrated booking |
| Generic recommendations | Personalized by traveler type |
| No preparation guides | Detailed packing lists & gear guides |
| Online-only | Offline-first mobile app |
| Seasonal categories | Month-by-month specificity |
| No aurora tools | Real-time forecasts & alerts |

## Tech Stack

### Frontend
- **Web**: Next.js 14 (React), TypeScript, Tailwind CSS
- **Mobile**: React Native (Expo), TypeScript

### Backend
- **API**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT

### Infrastructure
- Monorepo structure with npm workspaces
- Shared packages for types and utilities
- RESTful API architecture

## Project Structure

```
yk-trip-planner/
├── apps/
│   ├── web/              # Next.js web application
│   ├── mobile/           # React Native mobile app
│   └── api/              # Backend API server
├── packages/
│   ├── types/            # Shared TypeScript types
│   ├── shared/           # Shared utilities
│   └── ui-components/    # Shared UI components (future)
├── docs/                 # Documentation
└── .github/              # GitHub workflows
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL >= 14

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd yk-trip-planner
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy .env.example files in each app directory
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

4. Configure your environment variables in each `.env` file

### Development

Run all apps in development mode:
```bash
npm run dev
```

Or run individual apps:
```bash
npm run dev:web      # Web app (http://localhost:3000)
npm run dev:api      # API server (http://localhost:3001)
npm run dev:mobile   # Mobile app (Expo)
```

### Building

Build all apps:
```bash
npm run build
```

Build individual apps:
```bash
npm run build:web
npm run build:api
npm run build:mobile
```

### Testing

```bash
npm test
```

### Linting and Formatting

```bash
npm run lint
npm run format
```

## Development Workflow

1. **Create a new feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the established code structure
   - Write tests for new features
   - Update documentation as needed

3. **Run tests and linting**
   ```bash
   npm run lint
   npm test
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

5. **Push and create a pull request**

## Implementation Roadmap (Research-Based)

### Phase 1 - MVP (Weeks 1-10) - **Essential Features**
Priority: Address critical gaps in existing tourism resources

- [ ] **Traveler Type Quiz & Personalization**
  - 8-10 question quiz to determine visitor profile
  - Personalized recommendations based on type
  - Custom homepage and filtered results

- [ ] **Comprehensive Cost Calculator**
  - Itemized trip cost breakdown
  - Budget, moderate, and luxury options
  - Seasonal pricing variations
  - Money-saving tips integration

- [ ] **Month-by-Month Seasonal Guide**
  - Temperature, daylight hours, aurora probability
  - Crowd levels and pricing by month
  - "Best month for..." recommendations
  - Activity availability calendar

- [ ] **Smart Packing List Generator**
  - Temperature-specific gear recommendations
  - Activity-based equipment lists
  - Local rental options with prices
  - Extreme cold survival guides

- [ ] **Enhanced Activity Discovery**
  - Advanced filtering (accessibility, indoor/outdoor, Indigenous-owned, etc.)
  - Map view with location pins
  - "Bad weather alternatives" quick filter
  - Budget range filtering

- [ ] **Real-Time Aurora Forecast**
  - KP Index and visibility predictions
  - Cloud cover integration
  - Best viewing time recommendations
  - Aurora alert opt-in

### Phase 2 - Booking Integration (Weeks 11-16)
- [ ] User authentication and profiles
- [ ] Smart itinerary builder with conflict detection
- [ ] Booking and payment processing (Stripe)
- [ ] Email notifications and confirmations
- [ ] Offline mobile app functionality
- [ ] Indigenous cultural experience guides
- [ ] Budget vs. luxury activity comparisons

### Phase 3 - Enhanced Features (Weeks 17-24)
- [ ] Pre-built itinerary templates by traveler type
- [ ] Community tips and local insider recommendations
- [ ] Live conditions dashboard (ice roads, trails, air quality)
- [ ] Review and rating system with verification
- [ ] Photo spot guides with best times
- [ ] Multi-language support (French, Indigenous languages)

### Phase 4 - Growth & Analytics
- [ ] Tour operator dashboard and partner portal
- [ ] Advanced analytics and insights
- [ ] AI-powered smart recommendations
- [ ] Social features and trip sharing
- [ ] Loyalty program integration

## API Documentation

API documentation will be available at `http://localhost:3001/api/docs` when running in development mode.

## Research & Documentation

This project is built on extensive tourism research to address real visitor needs:

- **[User Research Findings](./docs/user-research-findings.md)** - Comprehensive analysis of visitor needs, pain points, and gaps in existing tourism resources
- **[Priority Features](./docs/priority-features.md)** - Detailed feature specifications based on research findings
- **[Development Guide](./docs/development-guide.md)** - Complete development instructions
- **[API Endpoints](./docs/api-endpoints.md)** - API documentation
- **[Database Schema](./docs/database-schema.md)** - Database structure
- **[Deployment Guide](./docs/deployment.md)** - Production deployment instructions

### Key Research Insights

1. **No Pricing Transparency**: Current tourism sites don't show costs - visitors struggle to budget
2. **Three Traveler Types**: Relaxed (comfort-focused), Curious (cultural), Adventurer (extreme experiences)
3. **Preparation Anxiety**: Many visitors have never experienced -40°C temperatures
4. **Aurora is King**: #1 attraction but needs real-time forecasting and alerts
5. **Offline is Critical**: Limited cell service in remote northern areas
6. **Indigenous Tourism**: Growing interest but needs cultural context and protocol guidance

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

## Contact

For questions or support, please contact [your-email@example.com]

## Acknowledgments

- Northern Frontier Visitors Association
- City of Yellowknife Tourism
- Local tour operators and businesses
