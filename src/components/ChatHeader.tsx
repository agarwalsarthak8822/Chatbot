import React from 'react';
import { MessageCircle, Trash2, Github, Settings } from 'lucide-react';

interface ChatHeaderProps {
  messageCount: number;
  onClearChat: () => void;
  onOpenSettings?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ messageCount, onClearChat, onOpenSettings }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-3 sm:px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">ChatGPT-like Assistant</h1>
            <p className="text-sm text-gray-500">
              {messageCount === 0 ? 'Ready to help' : `${messageCount} messages`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenSettings}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
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