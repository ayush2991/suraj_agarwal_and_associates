# Deployment Guide

This project is deployed on **Firebase Hosting** with **Cloud Functions**.

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
   # Option 1: Using Firebase environment config
   firebase functions:config:set gemini.api_key="your-gemini-api-key"
   
   # Option 2: Using .env file (for local development)
   # Create functions/.env file:
   echo "GEMINI_API_KEY=your-gemini-api-key-here" > functions/.env
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

The project requires the `GEMINI_API_KEY` environment variable:

### Firebase
- CLI: `firebase functions:config:set gemini.api_key="your-key"`
- Local: `functions/.env` file or export `GEMINI_API_KEY`

---

## 📁 Project Structure

```
.
├── index.html              # Main HTML file
├── styles.css              # Styles with dark mode support
├── script.js               # Main JavaScript
├── chat.js                 # AI chat widget
├── chat.css                # Chat widget styles
├── functions/              # Firebase Cloud Functions
│   ├── index.js            # Firebase function
│   └── package.json        # Function dependencies
├── firebase.json           # Firebase configuration
└── .firebaserc             # Firebase project settings
```

---

## 🌐 Custom Domain

### Add Custom Domain to Firebase
1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow verification and DNS setup instructions

---

## 🔒 Security Notes

- Never commit API keys to version control
- Use environment variables for all sensitive data
- Firebase automatically handles HTTPS
- Cloud Functions keep your API key secure on the server

---

## 🆘 Troubleshooting

### Chat not working on Firebase
- Verify function is deployed: `firebase functions:list`
- Check function logs: `firebase functions:log`
- Ensure API key is set: `firebase functions:config:get`
- For local dev, use `firebase serve` or `firebase emulators:start`

### 404 on function calls
- Function endpoint: `/api/chat` (configured in firebase.json rewrites)
- Check console for exact error messages

---

## 📊 Monitoring

### Firebase
- Functions → View logs in Firebase Console
- Hosting → Usage metrics and bandwidth

---

## 💰 Pricing

### Firebase
- **Spark plan (Free)**: Limited Cloud Functions, 10GB storage
- **Blaze plan (Pay as you go)**: First 2 million invocations free/month

Suitable for small to medium traffic sites. Monitor usage in Firebase Console.
