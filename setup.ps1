# YK Bike Finder - Automated Setup Script (Windows)
# Run this with PowerShell

Write-Host "🚲 YK Bike Finder - Setup Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion detected" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed" -ForegroundColor Red
    Write-Host "Please install Node.js 18+ from https://nodejs.org"
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✓ npm $npmVersion detected" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Check for .env.local
if (-not (Test-Path .env.local)) {
    Write-Host ""
    Write-Host "⚠️  .env.local not found" -ForegroundColor Yellow
    Write-Host "Creating from template..."
    Copy-Item .env.local.example .env.local
    Write-Host "✓ Created .env.local from template" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: You need to edit .env.local with your Firebase credentials" -ForegroundColor Yellow
    Write-Host "   1. Go to https://console.firebase.google.com"
    Write-Host "   2. Select your project"
    Write-Host "   3. Go to Project Settings > General > Your apps"
    Write-Host "   4. Copy the config values to .env.local"
    Write-Host ""
    Read-Host "Press Enter when you've updated .env.local"
} else {
    Write-Host "✓ .env.local already exists" -ForegroundColor Green
}

# Check if Firebase CLI is installed
try {
    firebase --version | Out-Null
    $firebaseInstalled = $true
} catch {
    $firebaseInstalled = $false
}

if (-not $firebaseInstalled) {
    Write-Host ""
    Write-Host "⚠️  Firebase CLI not found" -ForegroundColor Yellow
    $install = Read-Host "Do you want to install it globally? (y/n)"
    if ($install -eq "y" -or $install -eq "Y") {
        npm install -g firebase-tools
        Write-Host "✓ Firebase CLI installed" -ForegroundColor Green
        $firebaseInstalled = $true
    }
}

# Firebase login and setup
if ($firebaseInstalled) {
    Write-Host ""
    Write-Host "🔥 Firebase Setup" -ForegroundColor Cyan
    $deploy = Read-Host "Do you want to login and deploy Firebase rules? (y/n)"
    if ($deploy -eq "y" -or $deploy -eq "Y") {
        firebase login
        
        Write-Host ""
        Write-Host "Deploying Firestore rules..." -ForegroundColor Yellow
        firebase deploy --only firestore:rules,firestore:indexes
        
        Write-Host ""
        Write-Host "Deploying Storage rules..." -ForegroundColor Yellow
        firebase deploy --only storage
        
        Write-Host ""
        Write-Host "Deploying Realtime Database rules..." -ForegroundColor Yellow
        firebase deploy --only database
        
        Write-Host "✓ Firebase rules deployed" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "✨ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the development server:"
Write-Host "  npm run dev"
Write-Host ""
Write-Host "Then open: http://localhost:9482"
Write-Host ""
Write-Host "📚 For more information:"
Write-Host "  - QUICKSTART.md - Quick setup guide"
Write-Host "  - README.md - Full documentation"
Write-Host "  - PRE-DEPLOYMENT-CHECKLIST.md - Deployment checklist"
Write-Host ""
