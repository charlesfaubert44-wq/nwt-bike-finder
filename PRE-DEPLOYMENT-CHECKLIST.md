# 🚀 YK Bike Finder - Pre-Deployment Checklist

## ⚠️ CRITICAL - Security & Configuration

### 1. Environment Variables
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Add all Firebase configuration values from Firebase Console
- [ ] Verify all environment variables are set correctly
- [ ] For Vercel deployment: Add environment variables to Vercel dashboard
- [ ] Test that the app connects to Firebase successfully

### 2. Firebase Security Rules
- [ ] **Review and deploy Firestore security rules** (`firestore.rules`)
  ```bash
  firebase deploy --only firestore:rules
  ```
- [ ] **Review and deploy Storage security rules** (`storage.rules`)
  ```bash
  firebase deploy --only storage
  ```
- [ ] **Verify security rules are working** by testing unauthorized access
- [ ] Remove any test/development-only rules

### 3. Firebase Services Setup
- [ ] **Authentication**
  - [ ] Enable Email/Password authentication
  - [ ] Enable Google authentication
  - [ ] Add authorized domains (your production domain)
  - [ ] Configure email templates (optional)
  
- [ ] **Firestore Database**
  - [ ] Deploy Firestore indexes
    ```bash
    firebase deploy --only firestore:indexes
    ```
  - [ ] Verify database is in production mode
  - [ ] Review and test security rules
  
- [ ] **Storage**
  - [ ] Verify storage bucket exists
  - [ ] Deploy storage rules
  - [ ] Set up CORS if needed
  
- [ ] **Realtime Database**
  - [ ] Enable Realtime Database
  - [ ] Set up security rules for chat functionality
  - [ ] Test real-time messaging

### 4. Admin Setup
- [ ] Create `admins` collection in Firestore
- [ ] Add admin user document(s) with userId as document ID
  ```
  admins/{userId}: { email: "admin@example.com", createdAt: timestamp }
  ```
- [ ] Test admin access to protected routes

### 5. Firebase Functions (if using)
- [ ] Review functions code in `functions/src/`
- [ ] Build functions: `cd functions && npm run build`
- [ ] Deploy functions: `npm run deploy`
- [ ] Test Cloud Functions are working
- [ ] Set up environment variables for functions if needed

## 🔍 Testing & Validation

### 6. Local Testing
- [ ] Run local development server: `npm run dev`
- [ ] Test user registration and login
- [ ] Test reporting a stolen bike
- [ ] Test reporting a found bike
- [ ] Test image upload functionality
- [ ] Test AI matching system
- [ ] Test chat functionality
- [ ] Test map view displays correctly
- [ ] Test PWA installation on mobile device
- [ ] Test offline functionality

### 7. Security Testing
- [ ] Attempt to access data without authentication
- [ ] Attempt to modify another user's bike report
- [ ] Attempt to upload files larger than 10MB
- [ ] Attempt to upload non-image files
- [ ] Verify chat messages are only visible to participants

### 8. Performance & Optimization
- [ ] Run production build: `npm run build`
- [ ] Check bundle size and optimize if needed
- [ ] Test page load speeds
- [ ] Verify images are optimized
- [ ] Test TensorFlow.js model loads correctly
- [ ] Verify PWA caching is working

## 🌐 Deployment

### 9. Vercel Deployment (Recommended)
- [ ] Connect GitHub repository to Vercel
- [ ] Add all environment variables in Vercel dashboard
- [ ] Configure build settings:
  - Build Command: `npm run build`
  - Output Directory: `.next`
- [ ] Deploy and test preview deployment
- [ ] Verify environment variables are loaded
- [ ] Test all functionality on preview URL
- [ ] Promote to production

### 10. Domain & DNS
- [ ] Configure custom domain (optional)
- [ ] Update Firebase authorized domains
- [ ] Set up SSL/TLS (automatic with Vercel)
- [ ] Test site on production domain

### 11. Post-Deployment
- [ ] Test all features on production URL
- [ ] Verify Firebase services are connected
- [ ] Test PWA installation from production URL
- [ ] Monitor Firebase usage and quotas
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Set up analytics (Firebase Analytics, Google Analytics)
- [ ] Create backup of Firebase project

## 📱 Progressive Web App (PWA)

### 12. PWA Configuration
- [ ] Verify `manifest.json` is configured correctly
- [ ] Test PWA installation on iOS Safari
- [ ] Test PWA installation on Android Chrome
- [ ] Test offline functionality
- [ ] Verify service worker is registered
- [ ] Test push notifications (if implemented)

## 📊 Monitoring & Analytics

### 13. Setup Monitoring
- [ ] Enable Firebase Analytics
- [ ] Set up error tracking (Sentry recommended)
- [ ] Configure Firebase Performance Monitoring
- [ ] Set up usage alerts in Firebase Console
- [ ] Monitor Firestore read/write operations
- [ ] Monitor Storage usage

## 🔐 Final Security Review

### 14. Security Audit
- [ ] Review all Firebase security rules one more time
- [ ] Ensure no sensitive data is exposed in client-side code
- [ ] Verify API keys are properly restricted in Firebase Console
- [ ] Set up Firebase App Check (optional but recommended)
- [ ] Review CORS settings
- [ ] Ensure rate limiting is in place (via Firebase)

## 📝 Documentation

### 15. Update Documentation
- [ ] Update README.md with production URL
- [ ] Document any deployment-specific configurations
- [ ] Create user guide for reporting bikes
- [ ] Document admin panel usage
- [ ] Update DEPLOYMENT.md with any learned lessons

## 🎉 Launch Checklist

### 16. Soft Launch (Yellowknife Only)
- [ ] Verify location filtering to Yellowknife area
- [ ] Test with small group of beta users
- [ ] Gather feedback
- [ ] Fix any critical bugs
- [ ] Announce to Yellowknife community

### 17. Post-Launch Monitoring
- [ ] Monitor error rates in first 24 hours
- [ ] Check Firebase quotas and usage
- [ ] Respond to user feedback
- [ ] Monitor performance metrics
- [ ] Plan for scaling if needed

---

## 🚨 Emergency Rollback Plan
If critical issues occur:
1. Revert to previous Vercel deployment
2. Roll back Firebase security rules if needed
3. Communicate issue to users
4. Debug in staging environment
5. Redeploy when fixed

---

## 📞 Support Contacts
- Firebase Support: https://firebase.google.com/support
- Vercel Support: https://vercel.com/support
- GitHub Issues: [Your repo URL]/issues

**Last Updated:** October 22, 2025  
**Status:** Ready for deployment after checklist completion
