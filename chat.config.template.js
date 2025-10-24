// =====================
// AI Chat Configuration
// =====================
// IMPORTANT: Copy this file to 'chat.config.js' and add your API keys there
// Do NOT commit chat.config.js to GitHub

const CHAT_CONFIG = {
    // Set your API provider: 'gemini' or 'openai'
    provider: 'gemini', // Change to 'openai' if using OpenAI
    
    // Add your API keys here
    apiKeys: {
        gemini: '', // Add your Gemini API key here
        openai: ''  // Add your OpenAI API key here
    },
    
    // API endpoints
    endpoints: {
        // Stable Gemini v1 endpoint (free-tier friendly)
        gemini: 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent',
        openai: 'https://api.openai.com/v1/chat/completions'
    },
    
    // System prompt for the AI
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
