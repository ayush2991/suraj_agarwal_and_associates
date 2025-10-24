// =====================
// AI Chat Widget
// =====================
// Configuration is loaded from chat.config.js
// See chat.config.template.js for setup instructions

// =====================
// Chat UI Management
// =====================

class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        this.hasInteracted = false; // track if user initiated chat
        // Safe config accessor with sensible defaults so production doesn't crash
        this.CONFIG = this.getSafeConfig();
        this.init();
    }

    init() {
        this.createChatElements();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }

    // Safely read CHAT_CONFIG if present, otherwise provide defaults
    getSafeConfig() {
        const globalConfig = (typeof CHAT_CONFIG !== 'undefined') 
            ? CHAT_CONFIG 
            : (typeof window !== 'undefined' && window.CHAT_CONFIG) || null;

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

        // Defaults mainly support production (serverless) path; local dev still needs keys
        const defaults = {
            provider: 'gemini',
            apiKeys: { gemini: '', openai: '' },
            endpoints: {
                gemini: 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent',
                openai: 'https://api.openai.com/v1/chat/completions'
            },
            systemPrompt: DEFAULT_SYSTEM_PROMPT
        };

        if (!globalConfig) {
            // Don't crash if config is missing (e.g., production). Log once.
            try { console.warn('[Chat] CHAT_CONFIG not found, using safe defaults'); } catch {}
            return defaults;
        }
        // Merge shallowly so missing fields still get defaults
        return {
            ...defaults,
            ...globalConfig,
            apiKeys: { ...defaults.apiKeys, ...(globalConfig.apiKeys || {}) },
            endpoints: { ...defaults.endpoints, ...(globalConfig.endpoints || {}) }
        };
    }

    createChatElements() {
        // Create chat button
        const chatButton = document.createElement('button');
        chatButton.id = 'chat-button';
        chatButton.className = 'chat-button';
        chatButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span class="chat-button-badge">AI</span>
        `;
        document.body.appendChild(chatButton);

        // Create chat container
        const chatContainer = document.createElement('div');
        chatContainer.id = 'chat-container';
        chatContainer.className = 'chat-container';
        chatContainer.innerHTML = `
            <div class="chat-header">
                <div class="chat-header-info">
                    <div class="chat-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div>
                        <h3>Tax Assistant</h3>
                        <p class="chat-status">
                            <span class="status-dot"></span>
                            Online - Powered by AI
                        </p>
                    </div>
                </div>
                <button class="chat-close" id="chat-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chat-messages" id="chat-messages"></div>
            <div class="chat-input-container">
                <div class="chat-suggestions" id="chat-suggestions">
                    <button class="suggestion-chip" data-message="What services do you provide?">
                        What services do you provide?
                    </button>
                    <button class="suggestion-chip" data-message="How do I file my income tax return?">
                        How do I file ITR?
                    </button>
                    <button class="suggestion-chip" data-message="What is GST registration?">
                        GST registration
                    </button>
                </div>
                <div class="chat-input-wrapper">
                    <textarea 
                        id="chat-input" 
                        class="chat-input" 
                        placeholder="Ask about tax, GST, audits..."
                        rows="1"
                    ></textarea>
                    <button id="chat-send" class="chat-send">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
                <div class="chat-disclaimer">
                    AI-powered responses. For personalized advice, contact us directly.
                </div>
            </div>
        `;
        document.body.appendChild(chatContainer);
    }

    attachEventListeners() {
        const chatButton = document.getElementById('chat-button');
        const chatClose = document.getElementById('chat-close');
        const chatSend = document.getElementById('chat-send');
        const chatInput = document.getElementById('chat-input');
        const suggestions = document.querySelectorAll('.suggestion-chip');

        chatButton.addEventListener('click', () => this.toggleChat());
        chatClose.addEventListener('click', () => this.toggleChat());
        chatSend.addEventListener('click', () => this.handleSend());
        
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });

        chatInput.addEventListener('input', (e) => {
            this.autoResize(e.target);
        });

        suggestions.forEach(chip => {
            chip.addEventListener('click', () => {
                const message = chip.dataset.message;
                chatInput.value = message;
                this.handleSend();
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const container = document.getElementById('chat-container');
        const button = document.getElementById('chat-button');
        
        if (this.isOpen) {
            container.classList.add('active');
            button.classList.add('hidden');
            // If user has interacted already, keep expanded view when reopening
            if (this.hasInteracted) {
                container.classList.add('expanded');
            }
            document.getElementById('chat-input').focus();
        } else {
            container.classList.remove('active');
            button.classList.remove('hidden');
        }
    }

    autoResize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }

    addWelcomeMessage() {
        const welcomeMsg = {
            text: "Hello! 👋 I'm your AI tax assistant. I can help answer questions about income tax, GST, audits, and our CA services. How can I assist you today?",
            sender: 'bot',
            timestamp: new Date()
        };
        this.messages.push(welcomeMsg);
        this.renderMessage(welcomeMsg);
    }

    async handleSend() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message || this.isTyping) return;

        // Note: API key is only required for local development.
        // In production (Netlify), requests go through the serverless function and don't need a client key.

        // Mark that the user has interacted and expand chat window for easier reading
        this.hasInteracted = true;
        this.expandChatWindow();

        // Hide suggestions after first message
        const suggestions = document.getElementById('chat-suggestions');
        if (suggestions && this.messages.length > 1) {
            suggestions.style.display = 'none';
        }

        // Add user message
        const userMsg = {
            text: message,
            sender: 'user',
            timestamp: new Date()
        };
        this.messages.push(userMsg);
        this.renderMessage(userMsg);
        
        input.value = '';
        this.autoResize(input);

        // Show typing indicator
        this.showTyping();

        try {
            // Get AI response
            const response = await this.getAIResponse(message);
            
            this.hideTyping();
            
            const botMsg = {
                text: response,
                sender: 'bot',
                timestamp: new Date()
            };
            this.messages.push(botMsg);
            this.renderMessage(botMsg);
        } catch (error) {
            this.hideTyping();
            console.error('Chat error:', error);
            this.showError('Sorry, I encountered an error. Please try again or contact us directly.');
        }
    }

    expandChatWindow() {
        const container = document.getElementById('chat-container');
        if (container && !container.classList.contains('expanded')) {
            container.classList.add('expanded');
        }
    }

    async getAIResponse(userMessage) {
        // Unified path: always use Netlify Function (works on Netlify and with `netlify dev` locally)
        return await this.getNetlifyResponse(userMessage);
    }

    async getNetlifyResponse(userMessage) {
        // Call Netlify Function instead of direct API
        const response = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userMessage,
                // Use provided config if available, otherwise a safe default
                systemPrompt: this.CONFIG.systemPrompt
            })
        });

        if (!response.ok) {
            // Try to parse JSON error, but handle HTML responses gracefully
            let errorMessage = 'Failed to get response';
            try {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const error = await response.json();
                    errorMessage = error.error || errorMessage;
                } else {
                    // Got HTML or other non-JSON (likely 404 or server error page)
                    errorMessage = `Server error (${response.status}). Make sure you're running with 'netlify dev' locally or deployed on Netlify.`;
                }
            } catch (e) {
                errorMessage = `Server error (${response.status})`;
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return data.response;
    }

    async getGeminiResponse(userMessage, apiKey) {
        const url = `${this.CONFIG.endpoints.gemini}?key=${apiKey}`;

        // Helper to fetch a single chunk
        const fetchChunk = async (promptText) => {
            const response = await fetch(url, {
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
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'API request failed');
            }

            const data = await response.json();
            const candidate = data.candidates?.[0] || {};
            const parts = candidate.content?.parts || [];
            const text = parts.map(p => p.text || '').join('').trim();
            const finishReason = candidate.finishReason || candidate.finish_reason; // be defensive
            return { text, finishReason };
        };

        let combined = '';
        let iterations = 0;
        const maxIters = 3; // safety cap to avoid runaway
        let prompt = `${this.CONFIG.systemPrompt}\n\nUser question: ${userMessage}`;

        while (iterations < maxIters) {
            const { text, finishReason } = await fetchChunk(prompt);
            combined += (combined ? '\n' : '') + text;

            if (finishReason && String(finishReason).toUpperCase() === 'MAX_TOKENS') {
                // Ask for continuation
                prompt = `${this.CONFIG.systemPrompt}\n\nThe previous answer was cut off due to token limits. Continue the answer without repeating. Original question: ${userMessage}`;
                iterations += 1;
                continue;
            }
            break;
        }

        return combined.trim() || 'Sorry, I could not generate a response.';
    }

    async getOpenAIResponse(userMessage, apiKey) {
        const url = this.CONFIG.endpoints.openai;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: this.CONFIG.systemPrompt },
                    { role: 'user', content: userMessage }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'API request failed');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    renderMessage(message) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${message.sender}`;
        
        const time = message.timestamp.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });

        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${this.formatMessage(message.text)}</p>
                <span class="message-time">${time}</span>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    formatMessage(text) {
        // Convert markdown-style formatting to HTML
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        text = text.replace(/\n/g, '<br>');
        return text;
    }

    showTyping() {
        this.isTyping = true;
        const messagesContainer = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'chat-message bot';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTyping() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    showError(errorMessage) {
        const botMsg = {
            text: `⚠️ ${errorMessage}`,
            sender: 'bot',
            timestamp: new Date()
        };
        this.messages.push(botMsg);
        this.renderMessage(botMsg);
    }
}

// =====================
// Initialize Chat Widget
// =====================

document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all other scripts are loaded
    setTimeout(() => {
        window.chatWidget = new ChatWidget();
    }, 500);
});
