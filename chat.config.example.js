// =============================================
// QUICK START: AI CHAT CONFIGURATION
// =============================================
// Copy this file as 'chat.config.js' at the project root
// and fill in your API key(s). Ensure 'index.html' loads
// chat.config.js before chat.js.

const CHAT_CONFIG = {
    // ========================================
    // STEP 1: Choose your AI provider
    // ========================================
    // Options: 'gemini' or 'openai'
    // Gemini: Free tier available, good for testing
    // OpenAI: Better quality, costs ~$0.002 per chat
    
    provider: 'gemini',  // ← Change this to 'openai' if using OpenAI
    
    // ========================================
    // STEP 2: Add your API key
    // ========================================
    
    apiKeys: {
        // For Gemini (Google):
        // 1. Go to: https://makersuite.google.com/app/apikey
        // 2. Click "Create API Key"
        // 3. Paste it below (replace the empty string)
        gemini: '',  // ← Paste your Gemini API key here
        
        // For OpenAI:
        // 1. Go to: https://platform.openai.com/api-keys
        // 2. Click "Create new secret key"
        // 3. Paste it below (replace the empty string)
        openai: ''   // ← Paste your OpenAI API key here
    },
    
    // ========================================
    // STEP 3: Customize (Optional)
    // ========================================
    
    endpoints: {
        // Stable Gemini v1 endpoint using gemini-2.5-flash
        gemini: 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent',
        openai: 'https://api.openai.com/v1/chat/completions'
    },
    
    // Customize what the AI says and how it behaves
    systemPrompt: `You are a knowledgeable assistant for Suraj Agarwal & Associates, a chartered accountancy firm in Visakhapatnam, India. 
    
Your role is to provide helpful information about:
- Indian taxation (Income Tax, GST, TDS)
- Audit and compliance requirements
- Company registration procedures
- Basic accounting and bookkeeping queries
- General CA services

Guidelines:
- Be professional, clear, and concise
- Focus on Indian tax laws and regulations
- Provide accurate information based on current Indian tax regulations
- If asked about specific tax advice or filing, suggest booking a consultation
- Keep responses under 150 words when possible
- Use simple language that clients can understand
- For complex matters, recommend speaking with a CA directly

Always mention that for personalized advice, clients should contact the firm directly.`
};

// =============================================
// EXAMPLE CONFIGURATIONS
// =============================================

// Example 1: Using Gemini (Recommended for starting)
/*
const CHAT_CONFIG = {
    provider: 'gemini',
    apiKeys: {
        gemini: 'AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        openai: ''
    },
    // ... rest stays the same
};
*/

// Example 2: Using OpenAI
/*
const CHAT_CONFIG = {
    provider: 'openai',
    apiKeys: {
        gemini: '',
        openai: 'sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxx'
    },
    // ... rest stays the same
};
*/

// =============================================
// TESTING YOUR SETUP
// =============================================
// After adding your API key (for local development):
// 1. Save the file
// 2. Refresh your website (Ctrl+F5 or Cmd+Shift+R)
// 3. Look for the blue chat button in bottom-right corner
// 4. Click it and try asking: "What services do you provide?"
// 
// Note: In production on Netlify, no client API key is needed.
// The app uses a serverless function with the GEMINI_API_KEY env var.
//
// Still having issues? Check the browser console (F12)
// for detailed error messages.

// =============================================
// COST ESTIMATES (as of 2025)
// =============================================
// 
// Gemini Pro (Free Tier):
// - 60 requests per minute
// - Perfect for small to medium traffic
// - No credit card required
//
// OpenAI GPT-3.5-Turbo:
// - ~$0.0015-0.002 per conversation
// - Better quality responses
// - Requires billing setup
//
// For 100 chats/month:
// - Gemini: FREE
// - OpenAI: ~$0.20
//
// For 1000 chats/month:
// - Gemini: FREE (within limits)
// - OpenAI: ~$2.00
