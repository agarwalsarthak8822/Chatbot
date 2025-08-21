# Complete ChatGPT-like Chatbot Code

## Setup Instructions

1. Create a new directory for your project
2. Run `npm create vite@latest . -- --template react-ts`
3. Install additional dependencies: `npm install lucide-react`
4. Install dev dependencies: `npm install -D tailwindcss postcss autoprefixer`
5. Initialize Tailwind: `npx tailwindcss init -p`
6. Replace the generated files with the code below

## File Structure and Code

### package.json
```json
{
  "name": "vite-react-typescript-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}
```

### index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Chat Assistant</title>
    <meta name="description" content="A beautiful ChatGPT-like AI chatbot interface built with React and TypeScript" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### tsconfig.json
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

### tsconfig.app.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

### tsconfig.node.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

### src/main.tsx
```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### src/App.tsx
```typescript
import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ChatHeader } from './components/ChatHeader';
import { WelcomeScreen } from './components/WelcomeScreen';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, isLoading, isTyping, sendMessage, clearMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear all messages?')) {
      clearMessages();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader 
        messageCount={messages.length} 
        onClearChat={handleClearChat} 
      />
      
      <div className="flex-1 flex flex-col min-h-0">
        {messages.length === 0 ? (
          <WelcomeScreen onExampleClick={sendMessage} />
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.message}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              
              {isTyping && (
                <ChatMessage
                  message=""
                  isUser={false}
                  timestamp={new Date()}
                  isTyping={true}
                />
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>
      
      <ChatInput 
        onSendMessage={sendMessage} 
        disabled={isLoading}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
```

### src/hooks/useChat.ts
```typescript
import { useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const simulateAIResponse = (userMessage: string): string => {
    // Simple response simulation - in a real app, this would be an API call
    const responses = [
      "That's a great question! Let me think about that for a moment. Based on what you've shared, I think there are several interesting aspects to consider...",
      "I understand what you're asking about. This is actually a fascinating topic that touches on several important concepts. Let me break this down for you...",
      "Thanks for sharing that with me! I can definitely help you with this. Here's what I would suggest based on current best practices...",
      "That's an excellent point you've raised. I've been thinking about similar questions lately, and I believe the key factors to consider are...",
      "I appreciate you bringing this up! This reminds me of a related concept that might be helpful to explore together..."
    ];

    return responses[Math.floor(Math.random() * responses.length)] + 
           "\n\nThis is a simulated response. In a real implementation, this would connect to an AI service like OpenAI's GPT API to provide actual intelligent responses based on your input.";
  };

  const sendMessage = useCallback(async (message: string) => {
    if (isLoading) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);

    // Simulate API delay
    setTimeout(() => {
      setIsTyping(false);
      
      // Add AI response
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: simulateAIResponse(message),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000 + Math.random() * 1000); // Random delay between 2-3 seconds
  }, [isLoading]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    isTyping,
    sendMessage,
    clearMessages,
  };
};
```

### src/components/ChatHeader.tsx
```typescript
import React from 'react';
import { MessageCircle, Trash2, Github } from 'lucide-react';

interface ChatHeaderProps {
  messageCount: number;
  onClearChat: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ messageCount, onClearChat }) => {
  return (
    <header className="bg-white border-b border-gray-200 p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">AI Chat Assistant</h1>
            <p className="text-sm text-gray-500">
              {messageCount === 0 ? 'Ready to help' : `${messageCount} messages`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messageCount > 0 && (
            <button
              onClick={onClearChat}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              title="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            title="View on GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
```

### src/components/ChatMessage.tsx
```typescript
import React from 'react';
import { Copy, User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isUser, 
  timestamp, 
  isTyping = false 
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
  };

  return (
    <div className={`flex gap-3 p-4 ${isUser ? 'bg-gray-50' : 'bg-white'} group hover:bg-gray-50 transition-colors duration-200`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-600' : 'bg-green-600'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-gray-900">
            {isUser ? 'You' : 'AI Assistant'}
          </span>
          <span className="text-xs text-gray-500">
            {timestamp.toLocaleTimeString()}
          </span>
        </div>
        
        <div className="prose prose-sm max-w-none">
          {isTyping ? (
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              </div>
              <span className="text-gray-500 text-sm ml-2">Thinking...</span>
            </div>
          ) : (
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {message}
            </p>
          )}
        </div>
        
        {!isTyping && (
          <button
            onClick={copyToClipboard}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-200"
          >
            <Copy className="w-3 h-3" />
            Copy
          </button>
        )}
      </div>
    </div>
  );
};
```

### src/components/ChatInput.tsx
```typescript
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  disabled = false,
  isLoading = false 
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 120; // Maximum height in pixels
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t bg-white p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-3 bg-gray-50 rounded-lg border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            disabled={disabled}
            className="flex-1 resize-none bg-transparent border-none outline-none p-4 placeholder-gray-500 text-gray-900 min-h-[24px] max-h-[120px]"
            rows={1}
          />
          
          <button
            type="submit"
            disabled={!message.trim() || disabled || isLoading}
            className="flex-shrink-0 m-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-2">
          Press Enter to send, Shift + Enter for new line
        </p>
      </form>
    </div>
  );
};
```

### src/components/WelcomeScreen.tsx
```typescript
import React from 'react';
import { MessageCircle, Lightbulb, Code, BookOpen } from 'lucide-react';

interface WelcomeScreenProps {
  onExampleClick: (message: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onExampleClick }) => {
  const examples = [
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Creative Ideas",
      description: "Help me brainstorm ideas for a new project",
      prompt: "Help me brainstorm creative ideas for a mobile app that helps people learn new languages"
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Code Help",
      description: "Explain this code or help me debug",
      prompt: "Can you explain how React hooks work and show me a practical example?"
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Learning",
      description: "Teach me about a complex topic",
      prompt: "Explain quantum computing in simple terms with real-world analogies"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "General Chat",
      description: "Just have a conversation",
      prompt: "What are some interesting facts about space exploration?"
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Chat Assistant
        </h1>
        <p className="text-lg text-gray-600">
          How can I help you today?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(example.prompt)}
            className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
                {example.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {example.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {example.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Start typing your question or click on one of the examples above
        </p>
      </div>
    </div>
  );
};
```

## Quick Start Commands

After creating your project directory and copying all the files:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Features Included

- ✅ Modern React 18 with TypeScript
- ✅ Tailwind CSS for styling
- ✅ Lucide React icons
- ✅ Responsive design
- ✅ Message history with timestamps
- ✅ Typing indicators
- ✅ Copy message functionality
- ✅ Auto-scrolling chat
- ✅ Welcome screen with examples
- ✅ Clean, professional UI
- ✅ Smooth animations and transitions

## Customization

To connect to a real AI API (like OpenAI), modify the `simulateAIResponse` function in `src/hooks/useChat.ts` to make actual API calls instead of returning simulated responses.