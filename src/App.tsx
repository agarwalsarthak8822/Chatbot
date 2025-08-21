import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ChatHeader } from './components/ChatHeader';
import { WelcomeScreen } from './components/WelcomeScreen';
import { useChat } from './hooks/useChat';
import { SettingsModal } from './components/SettingsModal';

function App() {
  const { messages, isLoading, isTyping, sendMessage, clearMessages, apiKey, setApiKey, model, setModel } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (!apiKey) {
      setApiKey('AIzaSyCOOd8Ii3xyNiMcRq3Hk6DxFCZyAsZi3D8');
    }
  }, [apiKey, setApiKey]);

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear all messages?')) {
      clearMessages();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <ChatHeader 
        messageCount={messages.length} 
        onClearChat={handleClearChat}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      <div className="flex-1 flex flex-col min-h-0">
        {messages.length === 0 ? (
          <WelcomeScreen onExampleClick={sendMessage} />
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-2 sm:px-4 py-2">
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

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
        model={model}
        setModel={setModel}
      />
    </div>
  );
}

export default App;