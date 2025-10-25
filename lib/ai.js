// Shared Gemini API client with Google Search grounding
// CommonJS module so it works in both Netlify and Firebase functions

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

/**
 * Generate a grounded response using Gemini with Google Search tool.
 *
 * Inputs:
 * - message: user question string
 * - systemPrompt: optional system prompt override
 * - apiKey: Gemini API key
 * - options: { model?: string, temperature?: number, maxOutputTokens?: number, log?: boolean }
 *
 * Returns: { text: string, raw?: object }
 */
async function generateChatResponse({ message, systemPrompt, apiKey, options = {} }) {
  if (!apiKey) throw new Error('API key not configured');
  const {
    model = 'gemini-2.5-flash',
    temperature = 1.0,
    maxOutputTokens = 2048,
    log = process.env.LOG_AI === '1' || process.env.LOG_AI === 'true'
  } = options;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const callOnce = async (promptText) => {
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: promptText,
            },
          ],
        },
      ],
      tools: [
        {
          // Per docs: REST field name is google_search under v1beta
          google_search: {},
        },
      ],
      generationConfig: {
        temperature,
        maxOutputTokens,
      },
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    let data;
    if (!response.ok) {
      try { data = await response.json(); } catch {}
      if (log) {
        console.error('=== CHAT ERROR ===');
        try { console.error(JSON.stringify(data || {}, null, 2)); } catch {}
      }
      throw new Error((data && data.error && data.error.message) || 'API request failed');
    }

    data = await response.json();

    const candidate = (data.candidates && data.candidates[0]) || {};
    const parts = candidate.content && candidate.content.parts ? candidate.content.parts : [];
    const text = parts.map((p) => p.text || '').join('').trim();
    const finishReason = candidate.finishReason || candidate.finish_reason;

    return { text, finishReason, raw: data };
  };

  const effectiveSystemPrompt = systemPrompt || DEFAULT_SYSTEM_PROMPT;
  // Minimal logging: log the user query once
  if (log) {
    try {
      console.log('=== CHAT REQUEST ===');
      console.log(JSON.stringify({ message }, null, 2));
    } catch {}
  }

  let combined = '';
  let iterations = 0;
  const maxIters = 3;
  let prompt = `${effectiveSystemPrompt}\n\nUser question: ${message}`;

  while (iterations < maxIters) {
    const { text, finishReason, raw } = await callOnce(prompt);
    combined += (combined ? '\n' : '') + text;

    if (finishReason && String(finishReason).toUpperCase() === 'MAX_TOKENS') {
      prompt = `${effectiveSystemPrompt}\n\nThe previous answer was cut off due to token limits. Continue the answer without repeating. Original question: ${message}`;
      iterations += 1;
      continue;
    }

    // Attach the raw response of the last call for optional downstream use
    const finalText = combined.trim();
    if (log) {
      try {
        console.log('=== CHAT RESPONSE ===');
        console.log(finalText);
      } catch {}
    }
    return { text: finalText, raw };
  }

  const finalText = combined.trim();
  if (log) {
    try {
      console.log('=== CHAT RESPONSE ===');
      console.log(finalText);
    } catch {}
  }
  return { text: finalText };
}

module.exports = {
  DEFAULT_SYSTEM_PROMPT,
  generateChatResponse,
};
