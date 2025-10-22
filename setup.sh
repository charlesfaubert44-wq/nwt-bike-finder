#!/bin/bash

# YK Bike Finder - Automated Setup Script
# This script helps you set up the project quickly

set -e  # Exit on error

echo "🚲 YK Bike Finder - Setup Script"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

echo -e "${GREEN}✓${NC} Node.js $(node --version) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} npm $(npm --version) detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check for .env.local
if [ ! -f .env.local ]; then
    echo ""
    echo -e "${YELLOW}⚠️  .env.local not found${NC}"
    echo "Creating from template..."
    cp .env.local.example .env.local
    echo -e "${GREEN}✓${NC} Created .env.local from template"
    echo ""
    echo -e "${YELLOW}⚠️  IMPORTANT: You need to edit .env.local with your Firebase credentials${NC}"
    echo "   1. Go to https://console.firebase.google.com"
    echo "   2. Select your project"
    echo "   3. Go to Project Settings > General > Your apps"
    echo "   4. Copy the config values to .env.local"
    echo ""
    read -p "Press Enter when you've updated .env.local..."
else
    echo -e "${GREEN}✓${NC} .env.local already exists"
fi

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo ""
    echo -e "${YELLOW}⚠️  Firebase CLI not found${NC}"
    read -p "Do you want to install it globally? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm install -g firebase-tools
        echo -e "${GREEN}✓${NC} Firebase CLI installed"
    fi
fi

# Firebase login and setup
if command -v firebase &> /dev/null; then
    echo ""
    echo "🔥 Firebase Setup"
    read -p "Do you want to login and deploy Firebase rules? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        firebase login
        
        echo ""
        echo "Deploying Firestore rules..."
        firebase deploy --only firestore:rules,firestore:indexes
        
        echo ""
        echo "Deploying Storage rules..."
        firebase deploy --only storage
        
        echo ""
        echo "Deploying Realtime Database rules..."
        firebase deploy --only database
        
        echo -e "${GREEN}✓${NC} Firebase rules deployed"
    fi
fi

echo ""
echo "=================================="
echo -e "${GREEN}✨ Setup Complete!${NC}"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:9482"
echo ""
echo "📚 For more information:"
echo "  - QUICKSTART.md - Quick setup guide"
echo "  - README.md - Full documentation"
echo "  - PRE-DEPLOYMENT-CHECKLIST.md - Deployment checklist"
echo ""
