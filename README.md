# NWT Bike Finder

A Progressive Web App (PWA) for helping recover stolen bikes across the Northwest Territories. Built with Next.js, Firebase, and TensorFlow.js for intelligent image matching.

## Features

- 🚲 **Report Stolen Bikes**: Upload photos and details of stolen bikes
- 🔍 **Report Found Bikes**: Report bikes you've found in your community
- 🤖 **AI-Powered Matching**: TensorFlow.js analyzes photos to find potential matches
- 💬 **Real-time Chat**: Connect with bike owners/finders through secure messaging
- 🗺️ **Interactive Map**: View found bikes across all NWT communities
- 📱 **Mobile-First PWA**: Works offline and installs like a native app
- 🎨 **NWT Theme**: Beautiful design inspired by the Northwest Territories

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom NWT color palette
- **Backend**: Firebase (Auth, Firestore, Storage, Realtime Database)
- **AI**: TensorFlow.js for image feature extraction and matching
- **Maps**: Leaflet with OpenStreetMap
- **PWA**: next-pwa for offline support and app-like experience

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project with Authentication, Firestore, Storage, and Realtime Database enabled

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nwt-bike-finder
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Firebase Setup

1. Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable the following services:
   - Authentication (Email/Password and Google)
   - Firestore Database
   - Storage
   - Realtime Database
3. Set up security rules for Firestore and Storage
4. Add your domain to authorized domains in Authentication settings

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── auth/              # Authentication pages
│   ├── report/            # Bike reporting forms
│   ├── bikes/             # Bike detail pages
│   ├── map/               # Map view
│   └── matches/           # Match management
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and Firebase config
└── types/                # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@nwtbikefinder.ca or create an issue in this repository.

## Acknowledgments

- Northwest Territories cycling community
- OpenStreetMap contributors
- Firebase team
- Next.js team
- TensorFlow.js team