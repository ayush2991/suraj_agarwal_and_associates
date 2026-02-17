// =====================
// AI Chat Widget
// =====================
// Custom AI Assistant for Suraj Agarwal & Associates

class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        this.hasInteracted = false; 
        this.init();
    }

    init() {
        this.createChatElements();
        this.attachEventListeners();
        this.addWelcomeMessage();
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

        this.hasInteracted = true;
        this.expandChatWindow();

        // Hide suggestions after first interaction
        const suggestions = document.getElementById('chat-suggestions');
        if (suggestions) {
            suggestions.style.display = 'none';
        }

        // Add user message to UI
        const userMsg = {
            text: message,
            sender: 'user',
            timestamp: new Date()
        };
        this.messages.push(userMsg);
        this.renderMessage(userMsg);
        
        input.value = '';
        this.autoResize(input);
        this.showTyping();

        try {
            const response = await this.fetchAIResponse(message);
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

    async fetchAIResponse(userMessage) {
        // Calls the Firebase Cloud Function proxy
        const endpoint = '/api/chat';
        
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) {
            let errorMessage = `Server error (${response.status})`;
            try {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                }
            } catch (e) {
                console.error('Error parsing response:', e);
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return data.response;
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
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
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

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.chatWidget = new ChatWidget();
    }, 500);
});
