# Quick Setup Guide

## The Problem You Just Hit

You got: `SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON`

**What happened:** The chat widget is trying to call `/.netlify/functions/chat`, but that function only exists when you run with Netlify CLI or deploy to Netlify. Opening `index.html` directly in a browser tries to fetch from a non-existent endpoint, so it gets a 404 HTML page instead of JSON.

## Solution: Run with Netlify CLI

### Step 1: Install Netlify CLI (one time)

```bash
npm install -g netlify-cli
```

### Step 2: Set Your API Key

Get your Gemini API key from: https://makersuite.google.com/app/apikey

Then set it locally:

```bash
netlify env:set GEMINI_API_KEY your_actual_api_key_here
```

### Step 3: Run the Site

```bash
cd /Users/aayushagarwal/projects/suraj_agarwal_and_associates
netlify dev
```

This will:
- Start a local server (usually at http://localhost:8888)
- Serve the Netlify Function at `/.netlify/functions/chat`
- Use your environment variable for the API key

### Step 4: Open and Test

1. Open the URL from the terminal (e.g., http://localhost:8888)
2. Click the chat button
3. Send a message
4. It should work! ✅

## Alternative: Disable Chat Locally

If you just want to view the site without chat functionality:

1. Open `index.html`
2. Comment out the chat script:
   ```html
   <!-- <script src="chat.js?v=20251024"></script> -->
   ```
3. Open `index.html` directly in your browser

## Deploy to Netlify (Production)

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Update chat to serverless"
   git push origin main
   ```

2. Go to https://app.netlify.com/
3. Click "Add new site" → Import from Git
4. Connect your GitHub repo
5. In Site settings → Environment variables:
   - Add `GEMINI_API_KEY` with your key
6. Deploy!

Your site will be live at `https://your-site.netlify.app`

## Summary

- **Local dev**: Use `netlify dev` (requires Netlify CLI)
- **Production**: Deploy to Netlify with `GEMINI_API_KEY` environment variable
- **API key**: Never in code, always in environment variables

See `CHAT_SETUP.md` for more details.
