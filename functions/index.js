const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const { generateChatResponse, DEFAULT_SYSTEM_PROMPT } = require('./lib/ai');

// Define secret for Gemini API key (managed via Firebase Secrets)
const GEMINI_API_KEY = defineSecret('GEMINI_API_KEY');

// Firebase Cloud Function to proxy Gemini API calls
// This keeps your API key secure on the server
// Using 2nd gen for better performance and automatic public access
exports.chat = onRequest({ cors: true, region: 'us-central1', secrets: [GEMINI_API_KEY] }, async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    // Optional: Check for rate limiting based on IP (basic protection)
    // You can enable App Check in Firebase Console for stronger protection
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (process.env.LOG_REQUESTS === '1') {
        console.log(`Request from IP: ${clientIP}`);
    }

    // Prefer Secret Manager (defineSecret), fallback to process.env for local emulator
    const apiKey = process.env.GEMINI_API_KEY || GEMINI_API_KEY.value();
    if (!apiKey) {
        res.status(500).json({ error: 'API key not configured' });
        return;
    }

    try {
        // Parse the request body
        const { message, systemPrompt } = req.body;
        
        // Basic input validation
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            res.status(400).json({ error: 'Invalid message' });
            return;
        }
        
        if (message.length > 2000) {
            res.status(400).json({ error: 'Message too long (max 2000 characters)' });
            return;
        }
        const { text: aiResponse } = await generateChatResponse({
            message,
            systemPrompt: systemPrompt || DEFAULT_SYSTEM_PROMPT,
            apiKey,
            options: { model: 'gemini-2.5-flash' }
        });

        // Return success response
        res.status(200).json({ response: aiResponse });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: error.message || 'Internal server error' 
        });
    }
});
