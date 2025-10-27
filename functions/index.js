const { onRequest } = require('firebase-functions/v2/https');
const { generateChatResponse, DEFAULT_SYSTEM_PROMPT } = require('../lib/ai');

// Firebase Cloud Function (Gen 2) to proxy Gemini API calls
// This keeps your API key secure on the server
exports.chat = onRequest(
    {
        region: 'asia-south1',
        concurrency: 80,
        cors: true,
    },
    async (req, res) => {
        // Only allow POST requests
        if (req.method !== 'POST') {
            res.status(405).json({ error: 'Method not allowed' });
            return;
        }

        // Get API key from environment variable
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

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
    }
);
