import React from 'react';
import { Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

  // Minimal pointed loader when thinking (no avatar or AI label)
  if (isTyping && !isUser) {
    return (
      <div className="px-4 py-2 flex justify-start">
        <div className="relative inline-flex items-center gap-2 rounded-2xl bg-gray-100 text-gray-700 px-3 py-2 shadow-sm">
          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
          <span className="absolute left-0 -ml-1 bottom-2 w-2 h-2 bg-gray-100 rotate-45 rounded-sm" />
        </div>
      </div>
    );
  }

  // Regular message bubble
  return (
    <div className={`px-4 py-2 ${isUser ? 'flex justify-end' : 'flex justify-start'}`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${isUser ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-900'}`}>
        <div className={`prose prose-sm max-w-none ${isUser ? 'prose-invert' : ''}`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              pre({ children }) {
                return <pre className="overflow-x-auto p-3 bg-gray-900 text-gray-100 rounded-md">{children}</pre>;
              },
              code({ inline, children }) {
                if (inline) return <code className={`${isUser ? 'bg-white/20' : 'bg-gray-100'} px-1 py-0.5 rounded`}>{children}</code>;
                return <code>{children}</code>;
              },
            }}
          >
            {message}
          </ReactMarkdown>
        </div>

        <div className={`mt-1 flex ${isUser ? 'justify-end' : 'justify-start'} items-center gap-2`}>
          <span className={`text-[10px] ${isUser ? 'text-white/70' : 'text-gray-400'}`}>{timestamp.toLocaleTimeString()}</span>
          <button
            onClick={copyToClipboard}
            className={`transition-colors duration-200 flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${isUser ? 'text-white/80 hover:bg-white/10' : 'text-gray-500 hover:bg-gray-100'}`}
            title="Copy"
          >
            <Copy className="w-3 h-3" />
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};