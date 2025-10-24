# Setup Instructions

## The Problem

Opening `index.html` directly causes: `SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON`

**Why:** The chat needs `/.netlify/functions/chat` which only exists when running with Netlify CLI or deployed on Netlify.

## Solution

### Local Development

```bash
# 1. Install Netlify CLI (one time)
npm install -g netlify-cli

# 2. Set API key
netlify env:set GEMINI_API_KEY your_api_key_here

# 3. Run dev server
netlify dev

# 4. Open http://localhost:8888 (or URL shown in terminal)
```

Get API key: https://makersuite.google.com/app/apikey

### Deploy to Production

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy site"
git push origin main

# 2. Deploy on Netlify
# - Go to https://app.netlify.com/
# - Import your GitHub repo
# - Add environment variable: GEMINI_API_KEY
# - Deploy
```

## Alternative: Disable Chat Locally

To view the site without chat:

1. Comment out chat script in `index.html`:
   ```html
   <!-- <script src="chat.js?v=20251024"></script> -->
   ```
2. Open `index.html` directly in browser

## Troubleshooting

- **404 on functions**: Make sure you're using `netlify dev`, not opening HTML directly
- **API errors**: Check `GEMINI_API_KEY` is set correctly
- **Chat not working**: Check browser console (F12) for errors
