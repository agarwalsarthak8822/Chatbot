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