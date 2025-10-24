// Netlify Function to proxy Gemini API calls
// This keeps your API key secure on the server

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
        const effectiveSystemPrompt = systemPrompt || DEFAULT_SYSTEM_PROMPT;

        // Helper to call Gemini once
        const callGemini = async (promptText) => {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: promptText
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 2048,
                        }
                    })
                }
            );
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'API request failed');
            }
            const data = await response.json();
            const candidate = data.candidates?.[0] || {};
            const parts = candidate.content?.parts || [];
            const text = parts.map(p => p.text || '').join('').trim();
            const finishReason = candidate.finishReason || candidate.finish_reason;
            return { text, finishReason };
        };

        // Auto-continue loop if response is cut due to token limit
        let combined = '';
        let iterations = 0;
        const maxIters = 3;
    let prompt = `${effectiveSystemPrompt}\n\nUser question: ${message}`;

        while (iterations < maxIters) {
            const { text, finishReason } = await callGemini(prompt);
            combined += (combined ? '\n' : '') + text;
            if (finishReason && String(finishReason).toUpperCase() === 'MAX_TOKENS') {
                prompt = `${effectiveSystemPrompt}\n\nThe previous answer was cut off due to token limits. Continue the answer without repeating. Original question: ${message}`;
                iterations += 1;
                continue;
            }
            break;
        }

        const aiResponse = combined.trim();

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
