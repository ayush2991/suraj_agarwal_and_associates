# AI Chat Widget Setup Guide

## 🤖 Overview

The AI chat widget is powered via a unified serverless function (Netlify Functions). Your API key is stored as an environment variable on the server, not in the browser. This is more secure and works the same on localhost and production.

## 📁 Files Added

- `chat.js` - Chat logic and AI integration
- `chat.css` - Chat widget styling
- Updated `index.html` - Integrated chat widget

## 🚀 Quick Setup

### Step 1: Get an API Key

Choose your provider and create an API key:

- Gemini (recommended): https://makersuite.google.com/app/apikey
- OpenAI: https://platform.openai.com/api-keys

### Step 2: Set Environment Variable (Production on Netlify)

1. In Netlify → Site settings → Environment variables
2. Add variable:
   - Key: `GEMINI_API_KEY`
   - Value: your API key
3. Redeploy the site

### Step 3: Local Development (Same unified path)

Use the Netlify CLI so functions run locally with the same env:

1. Install CLI (once): `npm i -g netlify-cli`
2. Set env var locally: `netlify env:set GEMINI_API_KEY <your-key>`
3. Run locally: `netlify dev`
4. Open the local URL and test the chat

The widget always calls `/.netlify/functions/chat` in both environments.

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

- No client-side API keys. The API key lives only as an environment variable.
- For extra safety, restrict your Gemini key to your Netlify site domain(s) in Google’s console (HTTP referrer restrictions).
- Do not commit keys to Git. `chat.config.js` is ignored and not required.

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
- Verify `GEMINI_API_KEY` is set in Netlify (Site settings → Environment variables)
- If local, ensure you ran `netlify env:set GEMINI_API_KEY <key>` and are using `netlify dev`

### API errors?
- Gemini: Check API key is valid and referrer restrictions include your domain
- OpenAI: Verify billing and key validity (if you swap providers)
- Check Netlify function logs in the Netlify dashboard or terminal running `netlify dev`

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

1. Set your environment variable in Netlify
2. Test locally with `netlify dev`
3. Monitor usage and errors via Netlify logs and your provider dashboard
4. Customize prompt, UI, and suggestions in `chat.js` and `chat.css`

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
