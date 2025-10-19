# YK Bike Finder - Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Firebase CLI
- Vercel account (optional)

### 1. Firebase Setup

1. **Create Firebase Project**
   ```bash
   firebase login
   firebase init
   ```

2. **Enable Services**
   - Authentication (Email/Password + Google)
   - Firestore Database
   - Storage
   - Realtime Database

3. **Deploy Security Rules**
   ```bash
   firebase deploy --only firestore:rules
   firebase deploy --only storage
   ```

4. **Configure Environment Variables**
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

### 2. Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### 3. Vercel Deployment

1. **Connect Repository**
   - Push code to GitHub
   - Connect repository to Vercel

2. **Configure Environment Variables**
   - Add all Firebase environment variables
   - Set in Vercel dashboard

3. **Deploy**
   ```bash
   vercel --prod
   ```

## 🔧 Configuration

### Yellowknife Soft Launch
- Communities limited to: Yellowknife, Dettah, N'Dilo
- Easy expansion to full NWT available
- Soft launch banner can be removed

### PWA Configuration
- Service worker enabled
- Offline support
- Installable on mobile devices

### Security
- Firestore rules deployed
- Storage rules configured
- User authentication required

## 📱 Mobile Installation

Users can install the app on mobile devices:
1. Open in mobile browser
2. Tap "Add to Home Screen"
3. App installs like native app

## 🔄 Expansion to Full NWT

To expand beyond Yellowknife:

1. **Update Communities**
   ```typescript
   // In src/types/index.ts
   export const NWT_COMMUNITIES = FULL_NWT_COMMUNITIES;
   ```

2. **Remove Soft Launch Banner**
   ```typescript
   // In src/app/layout.tsx
   // Comment out or remove <SoftLaunchBanner />
   ```

3. **Update Branding**
   ```typescript
   // Change "YK Bike Finder" back to "NWT Bike Finder"
   ```

## 🛠️ Maintenance

### Regular Tasks
- Monitor Firebase usage
- Review reported content
- Update security rules as needed
- Backup user data

### Performance Optimization
- Monitor Core Web Vitals
- Optimize images
- Update dependencies regularly

## 📊 Analytics

### Firebase Analytics
- User engagement
- Feature usage
- Error tracking

### Custom Metrics
- Bike recovery success rate
- Community participation
- Geographic distribution

## 🆘 Troubleshooting

### Common Issues
1. **Firebase connection errors**
   - Check environment variables
   - Verify Firebase project setup

2. **Image upload failures**
   - Check storage rules
   - Verify file size limits

3. **Authentication issues**
   - Check auth domain configuration
   - Verify OAuth settings

### Support
- Check Firebase console for errors
- Review browser console logs
- Contact development team

## 🔐 Security Considerations

- All user data encrypted in transit
- Firestore rules prevent unauthorized access
- Image uploads validated and sanitized
- User authentication required for all actions

## 📈 Scaling

### Current Capacity
- Free tier supports small community
- ~50K daily reads
- ~20K daily writes
- 5GB storage

### Growth Plan
- Monitor usage metrics
- Upgrade Firebase plan as needed
- Consider CDN for images
- Implement caching strategies
