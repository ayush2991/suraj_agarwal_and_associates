# Suraj Agarwal & Associates

Professional website for a Chartered Accountant firm in Visakhapatnam, India.

## ✨ Features

- 🎨 Modern, responsive design with automatic dark mode
- 🤖 AI chat assistant powered by Google Gemini
- 📱 Mobile-friendly and accessible
- 🔒 Secure serverless API integration
- ⚡ Compatible with Netlify and Firebase hosting
- 🌙 Auto dark mode based on system preferences

## 🚀 Quick Start

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete setup instructions for both Netlify and Firebase.

### Local Development (Netlify)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Create .env file with your API key
echo "GEMINI_API_KEY=your-key-here" > .env

# Run dev server
netlify dev
```

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
├── index.html              # Main HTML
├── styles.css              # Styles with dark mode
├── script.js               # Site functionality
├── chat.js                 # AI chat widget
├── chat.css                # Chat styling
├── netlify/
│   └── functions/
│       └── chat.js         # Netlify function
├── functions/              # Firebase functions
│   ├── index.js           # Cloud function
│   └── package.json       # Dependencies
├── netlify.toml           # Netlify config
├── firebase.json          # Firebase config
└── DEPLOYMENT.md          # Full deployment guide
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
Edit the system prompt in:
- Netlify: `netlify/functions/chat.js`
- Firebase: `functions/index.js`

## 🔒 Security

- API keys are stored securely in environment variables
- Never committed to version control
- Serverless functions keep keys on the server
- HTTPS enforced by both platforms

## 📝 Environment Variables

Both platforms require:
- `GEMINI_API_KEY` - Your Google Gemini API key

**Netlify**: Set in dashboard or via CLI  
**Firebase**: Set via `firebase functions:config:set`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🆘 Support

For deployment issues or questions, see the troubleshooting section in [DEPLOYMENT.md](./DEPLOYMENT.md).

## 📄 License

This project is for Suraj Agarwal & Associates.

