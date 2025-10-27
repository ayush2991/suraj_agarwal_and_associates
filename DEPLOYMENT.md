# Deployment Guide

This project is compatible with both **Netlify** and **Firebase Hosting**.

## 🚀 Netlify Deployment

### Prerequisites
- [Netlify account](https://app.netlify.com/signup)
- Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Option 1: Deploy via Netlify Dashboard

1. **Connect Repository**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository (GitHub, GitLab, or Bitbucket)

2. **Configure Build Settings**
   - Build command: (leave empty)
   - Publish directory: `.` (root directory)
   - Functions directory: `netlify/functions`

3. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add variable:
     - Key: `GEMINI_API_KEY`
     - Value: Your Gemini API key

4. **Deploy**
   - Click "Deploy site"
   - Your site will be live at `https://your-site-name.netlify.app`

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Set environment variable
netlify env:set GEMINI_API_KEY "your-gemini-api-key"

# Deploy to production
netlify deploy --prod
```

### Local Development with Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Set up environment variables
# Create .env file in project root:
echo "GEMINI_API_KEY=your-gemini-api-key-here" > .env

# Run local dev server (includes serverless functions)
netlify dev
```

The site will be available at `http://localhost:8888`

---

## 🔥 Firebase Deployment

### Prerequisites
- [Firebase account](https://console.firebase.google.com/)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Setup

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Follow the setup wizard

4. **Initialize Firebase in your project**
   ```bash
   # In your project directory
   firebase init
   ```
   
   When prompted:
   - Select: **Hosting** and **Functions**
   - Choose: **Use an existing project** → Select your project
   - For Hosting setup:
     - Public directory: `.` (current directory)
     - Configure as single-page app: `No`
     - Set up automatic builds: `No`
     - File `firebase.json` already exists: `No` (or backup first)
   - For Functions:
     - Language: **JavaScript**
     - ESLint: Your preference
     - Install dependencies: **Yes**

5. **Update `.firebaserc`**
   ```json
   {
     "projects": {
       "default": "your-firebase-project-id"
     }
   }
   ```

6. **Install Function Dependencies**
   ```bash
   cd functions
   npm install
   cd ..
   ```

7. **Set Environment Variables**
   ```bash
   # For Gen 2 Cloud Functions, set environment variables via Firebase Console
   # or use .env files for local development
   
   # For production: Set in Firebase Console
   # Go to: Firebase Console → Functions → Select function → Configuration
   # Add GEMINI_API_KEY environment variable
   
   # For local development: Create functions/.env file
   echo "GEMINI_API_KEY=your-gemini-api-key-here" > functions/.env
   
   # Note: Gen 1 functions:config:set is deprecated for Gen 2 functions
   ```

### Deploy to Firebase

```bash
# Deploy everything (hosting + functions)
firebase deploy

# Or deploy only hosting
firebase deploy --only hosting

# Or deploy only functions
firebase deploy --only functions
```

Your site will be live at:
- `https://your-project-id.web.app`
- `https://your-project-id.firebaseapp.com`

### Local Development with Firebase

```bash
# Set environment variable for local testing
export GEMINI_API_KEY="your-gemini-api-key"

# Or create functions/.env file with:
# GEMINI_API_KEY=your-gemini-api-key

# Serve locally (hosting + functions)
firebase serve

# Or run emulators for full offline testing
firebase emulators:start
```

The site will be available at `http://localhost:5000`

---

## 🔧 Environment Variables

Both platforms require the `GEMINI_API_KEY` environment variable:

### Netlify
- Dashboard: Site settings → Environment variables
- CLI: `netlify env:set GEMINI_API_KEY "your-key"`
- Local: `.env` file in project root

### Firebase (Gen 2 Cloud Functions)
- Console: Firebase Console → Functions → Configuration → Add environment variable `GEMINI_API_KEY`
- Local: `functions/.env` file or export `GEMINI_API_KEY`
- Note: For Gen 2 functions, use environment variables (not the deprecated `functions:config:set`)

---

## 📁 Project Structure

```
.
├── index.html              # Main HTML file
├── styles.css              # Styles with dark mode support
├── script.js               # Main JavaScript
├── chat.js                 # AI chat widget
├── chat.css                # Chat widget styles
├── netlify/
│   └── functions/
│       └── chat.js         # Netlify serverless function
├── functions/              # Firebase Cloud Functions
│   ├── index.js            # Firebase function
│   └── package.json        # Function dependencies
├── netlify.toml            # Netlify configuration
├── firebase.json           # Firebase configuration
└── .firebaserc             # Firebase project settings
```

---

## 🌐 Custom Domain

### Netlify
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions

### Firebase
1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow verification and DNS setup instructions

---

## 🔒 Security Notes

- Never commit API keys to version control
- Use environment variables for all sensitive data
- Both platforms automatically handle HTTPS
- The serverless functions keep your API key secure on the server

---

## 🆘 Troubleshooting

### Chat not working on Netlify
- Ensure `GEMINI_API_KEY` is set in environment variables
- Check function logs: `netlify functions:log chat`
- For local dev, use `netlify dev` (not just opening `index.html`)

### Chat not working on Firebase
- Verify function is deployed: `firebase functions:list`
- Check function logs: `firebase functions:log`
- Ensure API key is set: Check Firebase Console → Functions → Configuration
- For local dev, use `firebase serve` or `firebase emulators:start` with `GEMINI_API_KEY` env var

### 404 on function calls
- **Netlify**: Function should be at `/.netlify/functions/chat`
- **Firebase**: Function should be at `/api/chat` (configured in firebase.json)
- Check console for exact error messages

---

## 📊 Monitoring

### Netlify
- Functions → View logs in dashboard
- Analytics → Traffic and performance metrics

### Firebase
- Functions → View logs in Firebase Console
- Hosting → Usage metrics and bandwidth

---

## 💰 Pricing

### Netlify
- **Free tier**: 100GB bandwidth, 300 build minutes/month
- Serverless functions: 125,000 requests/month free

### Firebase
- **Spark plan (Free)**: Limited Cloud Functions, 10GB storage
- **Blaze plan (Pay as you go)**: First 2 million invocations free/month

Both are suitable for small to medium traffic sites. Monitor usage in respective dashboards.
