# Suraj Agarwal & Associates

Professional website for a Chartered Accountant firm, featuring an AI chat assistant and inquiry form.

## 🚀 Development

1. **Install Firebase CLI**: `npm install -g firebase-tools`
2. **Environment Setup**:
   - Create `functions/.env` for local testing.
   - Set production secrets:
     ```bash
     firebase functions:secrets:set GEMINI_API_KEY
     firebase functions:secrets:set SENDER_EMAIL
     firebase functions:secrets:set EMAIL_APP_PASSWORD
     ```
3. **Run Locally**: `firebase serve`
4. **Deploy**: `firebase deploy`

## 📦 Structure

- `/public`: Frontend (HTML/CSS/JS)
- `/functions`: Backend logic (AI & Emailing)
- `firebase.json`: Hosting and function configuration

## 🔒 Security

Sensitive keys are managed via **Firebase Secrets** and never committed to version control.
