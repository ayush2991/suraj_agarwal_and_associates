#!/bin/bash

# ======================================
# Quick Deploy Script for Netlify
# ======================================

echo "🚀 Deploying Suraj Agarwal & Associates Website"
echo "================================================"
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Project files found"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo ""
    echo "📝 Uncommitted changes found. Committing..."
    git add .
    git commit -m "Prepare for deployment - $(date +%Y-%m-%d)"
    echo "✅ Changes committed"
else
    echo "✅ No uncommitted changes"
fi

echo ""
echo "================================================"
echo "🎯 Next Steps:"
echo "================================================"
echo ""
echo "1. Create GitHub Repository:"
echo "   → Go to: https://github.com/new"
echo "   → Name: suraj_agarwal_and_associates"
echo "   → Create repository"
echo ""
echo "2. Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/suraj_agarwal_and_associates.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to Netlify:"
echo "   → Go to: https://app.netlify.com/"
echo "   → Click 'Add new site' → 'Import from Git'"
echo "   → Select your repository"
echo "   → Click 'Deploy site'"
echo ""
echo "4. Configure Environment Variables in Netlify:"
echo "   → Site settings → Environment variables"
echo "   → Add: GEMINI_API_KEY = your_api_key"
echo ""
echo "5. Restrict API Key:"
echo "   → Go to: https://makersuite.google.com/app/apikey"
echo "   → Edit your key → HTTP referrers"
echo "   → Add: https://your-site.netlify.app/*"
echo ""
echo "================================================"
echo "📖 For detailed instructions, see:"
echo "   DEPLOYMENT_GUIDE.md"
echo "================================================"
echo ""
echo "✨ Your website will be live in minutes!"
echo ""
