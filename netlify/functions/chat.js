// Netlify Function to proxy Gemini API calls via shared client
// Keeps API key secure and reuses logic with Firebase functions

const { generateChatResponse, DEFAULT_SYSTEM_PROMPT } = require('../../lib/ai');

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    // Get API key from environment variable
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'API key not configured' })
        };
    }

    try {
        // Parse the request body
        const { message, systemPrompt } = JSON.parse(event.body);
        const { text: aiResponse } = await generateChatResponse({
            message,
            systemPrompt: systemPrompt || DEFAULT_SYSTEM_PROMPT,
            apiKey: GEMINI_API_KEY,
            options: { model: 'gemini-2.5-flash' }
        });

        // Return success response
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ response: aiResponse })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: error.message || 'Internal server error' 
            })
        };
    }
};
