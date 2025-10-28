# Firebase App Check Setup Guide

App Check helps protect your Cloud Functions from abuse by verifying that requests come from your actual app, not from bots or unauthorized sources.

## Why App Check?

- **Prevents abuse**: Blocks requests from unauthorized sources
- **No code changes needed**: Works transparently once enabled
- **Free tier friendly**: Included in Firebase free tier
- **Easy to set up**: Configure through Firebase Console

## Setup Steps

### 1. Enable App Check in Firebase Console

1. Go to: https://console.firebase.google.com/project/suraj-agarwal-associates-ca/appcheck
2. Click **"Get Started"** or **"Register"**

### 2. Register Your Web App

1. Click **"Apps"** tab
2. Select your web app (or create one if needed)
3. Choose **reCAPTCHA v3** as your provider:
   - reCAPTCHA v3 works invisibly in the background
   - No user interaction required (unlike v2 with checkboxes)
4. Click **"Register"**
5. Copy the **Site Key** that's generated

### 3. Add App Check to Your Website

Add this script to your `index.html` in the `<head>` section (after Firebase scripts):

```html
<!-- Firebase App Check -->
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-check.js"></script>
<script>
  // Initialize App Check with reCAPTCHA v3
  const appCheck = firebase.appCheck();
  appCheck.activate(
    'YOUR_RECAPTCHA_SITE_KEY_HERE', // Replace with your actual site key
    true // Set to true to automatically refresh tokens
  );
</script>
```

### 4. Protect Your Cloud Function

1. In Firebase Console, go to: **App Check** → **APIs**
2. Find **Cloud Functions** or your specific function
3. Click **"Enforce"** to require App Check tokens
4. Start with **"Metrics only"** mode first to test without blocking requests

### 5. Test Your Setup

1. Visit your website: https://suraj-agarwal-associates-ca.web.app
2. Open browser DevTools → Console
3. Try using the chat widget
4. Check Firebase Console → App Check → Metrics to see verified requests

## Monitoring

### View App Check Metrics
- Go to: https://console.firebase.google.com/project/suraj-agarwal-associates-ca/appcheck/metrics
- See verified vs unverified requests
- Monitor for suspicious activity

### Check Function Logs
```bash
firebase functions:log --only chat
```

## Troubleshooting

### Chat not working after enabling App Check?

1. **Check browser console** for App Check errors
2. **Verify reCAPTCHA site key** is correct in your HTML
3. **Start with "Metrics only" mode** instead of "Enforce" to test
4. **Check domain allowlist** in reCAPTCHA admin console

### Still seeing abuse?

1. **Switch enforcement mode** from Metrics to Enforce
2. **Check Firebase quotas** in Console
3. **Review function logs** for patterns
4. **Consider adding custom rate limiting** in your function code

## Alternative: reCAPTCHA Enterprise

For higher traffic or more advanced protection:

1. Go to: https://console.cloud.google.com/security/recaptcha
2. Enable reCAPTCHA Enterprise
3. Use it instead of reCAPTCHA v3 in App Check

## Cost

- **reCAPTCHA v3**: Free for most websites
- **reCAPTCHA Enterprise**: First 10k assessments/month free
- **App Check**: Free (included in Firebase)

## Security Notes

- App Check tokens expire automatically
- Tokens are cryptographically signed by Google
- Works alongside other security measures (CORS, input validation)
- Does not replace proper backend validation
- Your API key stays secure on the server (unchanged)

## Current Status

✅ Cloud Function is public and working
✅ Input validation in place
✅ CORS configured
✅ Rate limiting logs available
⏸️ App Check: Ready to enable (optional)

**Recommendation**: Enable App Check in "Metrics only" mode first to monitor traffic patterns, then switch to "Enforce" if you see suspicious activity.

## Learn More

- [Firebase App Check Docs](https://firebase.google.com/docs/app-check)
- [reCAPTCHA v3 Docs](https://developers.google.com/recaptcha/docs/v3)
- [Cloud Functions Security Best Practices](https://firebase.google.com/docs/functions/security)
