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
       - Public directory: `public`
       - Configure as single-page app: `No`
       - Set up automatic builds: `No`
       - File `firebase.json` already exists: `Yes` (keep existing)
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

7. **Configure Secrets (Recommended)**
    ```bash
    # Store the Gemini API key in Firebase Secrets
    firebase functions:secrets:set GEMINI_API_KEY
    ```

    Local development options:
    - Create a local env file for the emulator (not committed):
       ```bash
       echo "GEMINI_API_KEY=your-gemini-api-key-here" > functions/.env
       ```
    - Or export in your shell before running emulators:
       ```bash
       export GEMINI_API_KEY=your-gemini-api-key-here
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

The project requires the `GEMINI_API_KEY` secret:

### Firebase (Production/Preview)
- Use: `firebase functions:secrets:set GEMINI_API_KEY`

### Local
- Use a `functions/.env` file or export `GEMINI_API_KEY` in your shell

---

## 📁 Project Structure

```
.
├── public/                 # Firebase Hosting site root
│   ├── index.html          # Main HTML
│   └── assets/
│       ├── css/
│       │   ├── styles.css      # Site styles with dark mode
│       │   ├── chat.css        # Chat widget styles
│       │   ├── theme-cool.css  # Optional cool theme
│       │   └── theme-warm.css  # Optional warm theme
│       └── js/
│           ├── script.js       # Site functionality
│           └── chat.js         # AI chat widget
├── functions/              # Firebase Cloud Functions
│   ├── index.js            # Cloud Function: chat
│   ├── package.json        # Function dependencies
│   └── lib/
│       └── ai.js           # Gemini API client
├── firebase.json           # Firebase configuration
├── .firebaserc             # Firebase project settings
└── README.md               # Overview and local dev
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
