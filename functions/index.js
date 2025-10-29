const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const DEFAULT_SYSTEM_PROMPT = `You are a knowledgeable assistant for Suraj Agarwal & Associates, a chartered accountancy firm in Visakhapatnam, India. 
    
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

Always mention that for personalized advice, clients should contact the firm directly.`;


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

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const chat = model.startChat({
            history: [
                { role: 'user', parts: [{ text: systemPrompt || DEFAULT_SYSTEM_PROMPT }] },
                { role: 'model', parts: [{ text: 'Okay, I understand. How can I help you today?' }] },
            ],
            generationConfig: {
                temperature: 1.0,
                maxOutputTokens: 2048,
            },
            tools: [
                {
                    googleSearch: {},
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const aiResponse = result.response;
        const text = aiResponse.text();

        // Return success response
        res.status(200).json({ response: text });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: error.message || 'Internal server error' 
        });
    }
});
