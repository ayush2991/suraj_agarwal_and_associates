# Suraj Agarwal & Associates

Professional website for a Chartered Accountant firm in Visakhapatnam, India.

## ✨ Features

- 🎨 Modern, responsive design with automatic dark mode
- 🤖 AI chat assistant powered by Google Gemini
- 📱 Mobile-friendly and accessible
- 🔒 Secure serverless API integration
- ⚡ Deployed on Firebase Hosting with Cloud Functions
- 🌙 Auto dark mode based on system preferences

## 🚀 Quick Start

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete Firebase deployment instructions.

### Local Development (Firebase)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Set environment variable
export GEMINI_API_KEY="your-key-here"

# Run emulator
firebase serve
```

Get your Gemini API key: https://aistudio.google.com/app/apikey

## 📦 Project Structure

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
├── functions/              # Firebase functions
│   ├── index.js            # Cloud function
│   └── package.json        # Dependencies
├── firebase.json           # Firebase config
└── DEPLOYMENT.md           # Full deployment guide
```

## 🎨 Customization

### Contact Information
Edit the contact section in `index.html`

### Colors & Theme
Modify CSS variables in `styles.css`:
- Light mode: `:root` section
- Dark mode: `@media (prefers-color-scheme: dark)` section

### Services
Update the services grid in `index.html`

### Chat Behavior
Edit the system prompt in `functions/index.js`

## 🔒 Security

- API keys are stored securely in environment variables
- Never committed to version control
- Cloud Functions keep keys on the server
- HTTPS enforced by Firebase

## 📝 Secrets / Environment
Required secret:
- `GEMINI_API_KEY` — your Google Gemini API key

Set via Firebase Secrets (recommended):
```bash
firebase functions:secrets:set GEMINI_API_KEY
```

Local development options:
- Create `functions/.env` with `GEMINI_API_KEY=...`, or
- Export in shell before running emulators

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full details.

## 🆘 Support

For deployment issues or questions, see the troubleshooting section in [DEPLOYMENT.md](./DEPLOYMENT.md).

## 📄 License

This project is for Suraj Agarwal & Associates.

