const functions = require('firebase-functions');
const { generateChatResponse, DEFAULT_SYSTEM_PROMPT } = require('../lib/ai');

// Firebase Cloud Function to proxy Gemini API calls
// This keeps your API key secure on the server
exports.chat = functions.https.onRequest(async (req, res) => {
    // Enable CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    // Get API key from environment variable (env var preferred). Fallback to firebase functions config only if set.
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || functions.config().gemini?.api_key;
    
    if (!GEMINI_API_KEY) {
        res.status(500).json({ error: 'API key not configured' });
        return;
    }

    try {
        // Parse the request body
        const { message, systemPrompt } = req.body;
        const { text: aiResponse } = await generateChatResponse({
            message,
            systemPrompt: systemPrompt || DEFAULT_SYSTEM_PROMPT,
            apiKey: GEMINI_API_KEY,
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
