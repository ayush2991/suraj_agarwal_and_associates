# AI Chat Widget Setup Guide

## 🤖 Overview

A modern AI-powered chat widget has been added to your website to answer client questions about taxation, GST, audits, and CA services. The widget supports both **Google Gemini** and **OpenAI** APIs.

## 📁 Files Added

- `chat.js` - Chat logic and AI integration
- `chat.css` - Chat widget styling
- Updated `index.html` - Integrated chat widget

## 🚀 Quick Setup

### Step 1: Choose Your AI Provider

The chat widget supports two AI providers:

#### Option A: Google Gemini (Recommended - Free tier available)
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

#### Option B: OpenAI (ChatGPT)
1. Visit: https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy your API key

### Step 2: Configure the Chat Widget

Open `chat.js` and update the configuration at the top:

```javascript
const CHAT_CONFIG = {
    // Set your provider: 'gemini' or 'openai'
    provider: 'gemini', // or 'openai'
    
    // Add your API keys here
    apiKeys: {
        gemini: 'YOUR_GEMINI_API_KEY_HERE',
        openai: 'YOUR_OPENAI_API_KEY_HERE'
    },
    
    // ... rest of config
};
```

**Example with Gemini:**
```javascript
apiKeys: {
    gemini: 'AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    openai: ''
}
```

**Example with OpenAI:**
```javascript
const CHAT_CONFIG = {
    provider: 'openai',
    apiKeys: {
        gemini: '',
        openai: 'sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxx'
    },
    // ... rest
};
```

### Step 3: Test the Chat

1. Refresh your website (Ctrl+F5 or Cmd+Shift+R)
2. Look for the blue chat button in the bottom-right corner
3. Click it to open the chat widget
4. Try asking: "What services do you provide?"

## ✨ Features

### For Visitors
- **Instant Answers** - Get immediate responses to common tax questions
- **24/7 Availability** - AI assistant available anytime
- **Smart Suggestions** - Quick-click buttons for common questions
- **Professional Guidance** - Trained on Indian tax laws and CA services
- **Mobile Friendly** - Fully responsive design

### For You
- **No Backend Required** - Runs entirely in the browser
- **Easy to Customize** - Simple configuration
- **Cost Effective** - Free tier available with Gemini
- **Professional UI** - Modern, branded design

## 🎨 Customization

### Change System Prompt

Edit the `systemPrompt` in `chat.js` to customize how the AI responds:

```javascript
systemPrompt: `You are a knowledgeable assistant for Suraj Agarwal & Associates...`
```

### Update Welcome Message

In `chat.js`, find the `addWelcomeMessage()` method:

```javascript
addWelcomeMessage() {
    const welcomeMsg = {
        text: "Your custom welcome message here!",
        sender: 'bot',
        timestamp: new Date()
    };
    // ...
}
```

### Modify Suggestion Chips

In `chat.js`, update the suggestions in `createChatElements()`:

```javascript
<button class="suggestion-chip" data-message="Your question here">
    Your question here
</button>
```

### Change Colors

In `chat.css`, the chat widget uses your website's color variables:
- `--secondary-color` - Primary chat color (blue gradient)
- `--accent-color` - Accent color (cyan)
- `--primary-color` - Header background

## 💰 Cost Considerations

### Google Gemini
- **Free Tier**: 60 requests per minute
- **Cost**: Free for most use cases
- **Best for**: Small to medium websites

### OpenAI GPT-3.5-Turbo
- **Cost**: ~$0.0015-0.002 per conversation
- **Best for**: Higher quality responses
- **Billing**: Pay-as-you-go

**Recommendation**: Start with Gemini's free tier, upgrade to OpenAI if needed.

## 🔒 Security Best Practices

### Important Notes:
1. **API Key Exposure**: The current setup exposes API keys in the browser. This is acceptable for:
   - Development/testing
   - Low-traffic websites
   - Free tier usage with rate limits

2. **For Production**: Consider implementing a backend proxy:
   ```
   Browser → Your Server → AI API
   ```
   This hides your API key and adds rate limiting.

### Rate Limiting (Optional)

Add this to `chat.js` to limit requests:

```javascript
// At the top of the ChatWidget class
constructor() {
    this.requestCount = 0;
    this.maxRequests = 50; // per session
    // ... rest of constructor
}

async handleSend() {
    if (this.requestCount >= this.maxRequests) {
        this.showError('Chat limit reached. Please contact us directly.');
        return;
    }
    this.requestCount++;
    // ... rest of method
}
```

## 🐛 Troubleshooting

### Chat button not appearing?
- Check browser console (F12) for errors
- Ensure `chat.js` and `chat.css` are loaded
- Clear browser cache and refresh

### "API key not configured" error?
- Verify you added your API key to `chat.js`
- Check for typos in the API key
- Ensure provider is set correctly ('gemini' or 'openai')

### API errors?
- **Gemini**: Check API key is valid at https://makersuite.google.com/
- **OpenAI**: Verify billing is set up at https://platform.openai.com/
- Check browser console for specific error messages

### Responses are slow?
- Normal for first request (API cold start)
- Check your internet connection
- Consider using OpenAI for faster responses

## 📱 Mobile Support

The chat widget is fully responsive:
- **Desktop**: 400x600px widget in bottom-right
- **Mobile**: Full-screen overlay
- **Tablet**: Optimized layout

## 🎯 Next Steps

1. **Add Your API Key** - Follow Step 2 above
2. **Test Thoroughly** - Ask various questions to ensure quality
3. **Monitor Usage** - Check your API dashboard regularly
4. **Customize** - Adjust colors, messages, and prompts
5. **Add Analytics** (Optional) - Track chat usage

## 📞 Support

For questions about:
- **AI APIs**: Check Google/OpenAI documentation
- **Customization**: Refer to comments in `chat.js`
- **Website Issues**: Check browser console for errors

## 🔗 Useful Links

- **Gemini API Docs**: https://ai.google.dev/docs
- **OpenAI API Docs**: https://platform.openai.com/docs
- **Font Awesome Icons**: https://fontawesome.com/icons

---

**Ready to Go!** Just add your API key and refresh the page. The chat widget will appear automatically. 🚀
