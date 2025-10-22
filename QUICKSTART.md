# YK Bike Finder - Quick Setup Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Clone and Install
```bash
git clone <your-repo-url>
cd nwt-bike-finder
npm install
```

### Step 2: Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Enable these services:
   - **Authentication** → Email/Password + Google
   - **Firestore Database** → Start in production mode
   - **Storage** → Default settings
   - **Realtime Database** → Locked mode

### Step 3: Get Firebase Config
1. Go to Project Settings → General
2. Scroll to "Your apps" → Web app
3. Copy the config values

### Step 4: Setup Environment
```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local with your Firebase values
# Use any text editor or:
notepad .env.local  # Windows
nano .env.local     # Mac/Linux
```

### Step 5: Deploy Firebase Rules
```bash
# Install Firebase CLI if you haven't
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize (select your project)
firebase init

# Deploy security rules
firebase deploy --only firestore:rules,firestore:indexes,storage
firebase deploy --only database  # For Realtime Database
```

### Step 6: Run Development Server
```bash
npm run dev
```

Open [http://localhost:9482](http://localhost:9482) 🎉

---

## ⚡ Quick Commands

```bash
# Development
npm run dev              # Start dev server (port 9482)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Firebase
firebase deploy --only firestore:rules    # Deploy Firestore rules
firebase deploy --only storage            # Deploy Storage rules
firebase deploy --only database           # Deploy Realtime DB rules
firebase deploy --only functions          # Deploy Cloud Functions
firebase emulators:start                  # Run local emulators
```

---

## 🔍 Troubleshooting

### "Firebase not configured"
- Check `.env.local` exists and has all values
- Restart dev server after adding environment variables

### "Permission denied" errors
- Deploy Firebase security rules: `firebase deploy --only firestore:rules`
- Make sure you're logged in: `firebase login`

### Images not uploading
- Deploy storage rules: `firebase deploy --only storage`
- Check file size (max 10MB)
- Verify file type is an image

### Can't see other users' bikes
- Make sure you're logged in
- Check Firestore rules are deployed
- Verify bikes have `status: 'active'`

### TensorFlow.js errors
- Clear browser cache
- Check internet connection (model loads from CDN)
- Try in incognito/private mode

---

## 📚 Key Files to Know

- **`.env.local`** - Your Firebase credentials (never commit!)
- **`firestore.rules`** - Database security rules
- **`storage.rules`** - File upload security rules
- **`database.rules.json`** - Realtime Database rules (chat)
- **`src/lib/firebase.ts`** - Firebase initialization
- **`src/lib/imageMatching.ts`** - AI matching logic

---

## 🎯 Next Steps

1. ✅ Complete [PRE-DEPLOYMENT-CHECKLIST.md](./PRE-DEPLOYMENT-CHECKLIST.md)
2. 📖 Read [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
3. 🧪 Test all features locally
4. 🚀 Deploy to Vercel or your preferred platform

---

## 🆘 Need Help?

- 📖 [Full Documentation](./README.md)
- 🔥 [Firebase Docs](https://firebase.google.com/docs)
- ⚛️ [Next.js Docs](https://nextjs.org/docs)
- 🐛 [Report Issues](https://github.com/your-repo/issues)

---

**Happy Coding! 🚲**
