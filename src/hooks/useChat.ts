import { useState, useCallback, useMemo } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
  const [apiKey, setApiKeyState] = useState<string>(() =>
    localStorage.getItem('ai_api_key') || ''
  );
  const [model, setModelState] = useState<string>(() =>
    localStorage.getItem('ai_model') || 'gemini-1.5-flash'
  );

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
           "\n\nThis is a simulated response. Add an API key in Settings to enable real AI answers.";
  };

  const genAI = useMemo(() => {
    if (!apiKey) return null;
    try {
      return new GoogleGenerativeAI(apiKey);
    } catch {
      return null;
    }
  }, [apiKey]);

  const sendMessage = useCallback(async (message: string) => {
    if (isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);

    // If no API key, fall back to simulated response
    if (!genAI) {
      setTimeout(() => {
        setIsTyping(false);
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message: simulateAIResponse(message),
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 600);
      return;
    }

    try {
      const modelClient = genAI.getGenerativeModel({ model });

      // Build conversation as Gemini contents
      const contents = [
        ...messages.map(m => ({
          role: m.isUser ? 'user' : 'model',
          parts: [{ text: m.message }],
        })),
        { role: 'user', parts: [{ text: message }] },
      ];

      // Create placeholder assistant message for streaming
      const assistantId = (Date.now() + 1).toString();
      setMessages(prev => [
        ...prev,
        { id: assistantId, message: '', isUser: false, timestamp: new Date() },
      ]);

      const stream = await modelClient.generateContentStream({ contents });

      for await (const chunk of stream.stream) {
        const chunkText = chunk?.text() || '';
        if (!chunkText) continue;
        setMessages(prev => prev.map(m => m.id === assistantId ? {
          ...m,
          message: m.message + chunkText,
        } : m));
      }

      setIsTyping(false);
      setIsLoading(false);
    } catch (error: unknown) {
      setIsTyping(false);
      setIsLoading(false);
      const fallback = typeof error === 'object' && error !== null ? String((error as any).message || error) : 'Unknown error';
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        message: `There was an error generating a response. ${fallback}`,
        isUser: false,
        timestamp: new Date(),
      }]);
    }
  }, [genAI, isLoading, messages, model]);

  const setApiKey = useCallback((key: string) => {
    setApiKeyState(key);
    if (key) localStorage.setItem('ai_api_key', key); else localStorage.removeItem('ai_api_key');
  }, []);

  const setModel = useCallback((m: string) => {
    setModelState(m);
    if (m) localStorage.setItem('ai_model', m);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    isTyping,
    sendMessage,
    clearMessages,
    apiKey,
    setApiKey,
    model,
    setModel,
  };
};