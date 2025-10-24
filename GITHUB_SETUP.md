# How to Upload to GitHub Without Exposing Your API Key

## 🔒 Security Setup (Already Done)

I've set up your project to keep API keys private:

### Files Created:
1. **`.gitignore`** - Tells Git to ignore sensitive files
2. **`chat.config.js`** - Your private config (contains your API key) ❌ NOT uploaded
3. **`chat.config.template.js`** - Public template (no API keys) ✅ Safe to upload

### How It Works:
- `chat.config.js` is in `.gitignore` → Git will ignore it
- `chat.config.template.js` has no keys → Safe for GitHub
- Your local site uses `chat.config.js` with your real API key
- GitHub users will copy the template and add their own keys

---

## 📤 Step-by-Step: Upload to GitHub

### Option 1: Using GitHub Desktop (Easiest)

1. **Download GitHub Desktop**
   - Visit: https://desktop.github.com/
   - Install and sign in

2. **Create New Repository**
   - File → New Repository
   - Name: `suraj_agarwal_and_associates`
   - Local Path: `/Users/aayushagarwal/projects/suraj_agarwal_and_associates`
   - Click "Create Repository"

3. **Publish to GitHub**
   - Click "Publish repository" button
   - Choose public or private
   - ✅ Your API key is automatically protected by `.gitignore`

### Option 2: Using Terminal Commands

```bash
# Navigate to your project
cd /Users/aayushagarwal/projects/suraj_agarwal_and_associates

# Initialize Git repository
git init

# Add all files (except those in .gitignore)
git add .

# Check what will be committed (chat.config.js should NOT appear)
git status

# Commit your files
git commit -m "Initial commit: CA website with AI chat"

# Create repository on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/suraj_agarwal_and_associates.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Option 3: Using VS Code

1. **Open Source Control** (Ctrl+Shift+G or Cmd+Shift+G)
2. **Initialize Repository** - Click the button
3. **Stage Changes** - Click the + icon next to "Changes"
4. **Commit** - Type message and click ✓
5. **Publish to GitHub** - Click "Publish Branch"

---

## ✅ Verify Your API Key is Protected

Before pushing to GitHub, check:

```bash
# This should show chat.config.js
cat .gitignore

# This should NOT list chat.config.js
git status
```

If `chat.config.js` appears in `git status`, run:
```bash
git rm --cached chat.config.js
```

---

## 📝 Instructions for GitHub Users

Add this to your README.md:

```markdown
## 🚀 Setup Instructions

### AI Chat Configuration

1. Copy the template file:
   ```bash
   cp chat.config.template.js chat.config.js
   ```

2. Get a free Gemini API key:
   - Visit: https://makersuite.google.com/app/apikey
   - Click "Create API Key"

3. Add your API key to `chat.config.js`:
   ```javascript
   apiKeys: {
       gemini: 'YOUR_API_KEY_HERE',
       openai: ''
   }
   ```

4. Open `index.html` in your browser - the chat will work!
```

---

## 🔐 Additional Security Tips

### 1. Never Commit Sensitive Files
If you accidentally committed `chat.config.js`:

```bash
# Remove from Git history
git rm --cached chat.config.js
git commit -m "Remove API key from repository"
git push

# Then change your API key at:
# https://makersuite.google.com/app/apikey
```

### 2. Use Environment Variables (Production)
For production deployment, use environment variables:

```javascript
// Instead of hardcoding:
apiKeys: {
    gemini: process.env.GEMINI_API_KEY
}
```

### 3. Set Up API Key Restrictions
In Google Cloud Console:
- Restrict by website (HTTP referrers)
- Set rate limits
- Monitor usage

### 4. Use a Backend Proxy (Recommended for Production)
Create a simple server that proxies AI requests:

```
Browser → Your Server (with API key) → Google AI
```

This completely hides your API key from the browser.

---

## 🎯 Quick Checklist

Before pushing to GitHub:

- [ ] `.gitignore` exists and includes `chat.config.js`
- [ ] `chat.config.template.js` exists (without API keys)
- [ ] Your `chat.config.js` has your real API key
- [ ] Run `git status` - `chat.config.js` should NOT appear
- [ ] Test locally to ensure chat still works
- [ ] Push to GitHub

---

## 🆘 Troubleshooting

**Chat not working after setup?**
- Make sure `chat.config.js` exists locally
- Check that `index.html` loads `chat.config.js` before `chat.js`
- Verify API key in `chat.config.js` is correct

**API key visible in Git?**
```bash
git rm --cached chat.config.js
git commit --amend
```

**Want to check what files will be uploaded?**
```bash
git status
git diff --cached
```

---

## 📊 File Structure After Setup

```
Your Computer:
├── chat.config.js          ← Has your API key (NOT on GitHub)
├── chat.config.template.js ← Empty template (on GitHub)
├── .gitignore              ← Protects sensitive files
└── [other files]

GitHub Repository:
├── chat.config.template.js ← Empty template
├── .gitignore              ← Protection rules
└── [other files]
(No chat.config.js - protected!)
```

---

You're all set! Your API key is protected and your code is ready for GitHub. 🎉
