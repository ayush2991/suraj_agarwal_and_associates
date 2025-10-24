# Suraj Agarwal & Associates

Professional website for a Chartered Accountant firm in Visakhapatnam, India.

## Features

- Modern, responsive design
- AI chat assistant (Gemini API via Netlify Functions)
- Contact form with validation
- Services showcase
- Mobile-friendly

## Quick Start

### Local Development

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Set API key
netlify env:set GEMINI_API_KEY your_api_key_here

# Run locally
netlify dev
```

Get Gemini API key: https://makersuite.google.com/app/apikey

### Deploy to Netlify

1. Push to GitHub
2. Import project at https://app.netlify.com/
3. Add environment variable: `GEMINI_API_KEY`
4. Deploy

See `SETUP_INSTRUCTIONS.md` for troubleshooting.

## Customization

- **Contact info**: Edit `index.html` contact section
- **Colors**: Edit CSS variables in `styles.css`
- **Services**: Modify services section in `index.html`
- **Chat prompt**: Edit system prompt in `netlify/functions/chat.js`

## Files

```
index.html          # Main page
styles.css          # Styling
script.js           # Site interactions
chat.js             # Chat widget
chat.css            # Chat styling
netlify/functions/  # Serverless function
netlify.toml        # Netlify config
```
