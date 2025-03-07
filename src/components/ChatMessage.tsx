
import React from 'react';
import { BookOpenText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, timestamp }) => {
  const formattedTime = timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div 
      className={cn(
        "flex gap-4 mb-4 px-4 md:px-6", 
        isBot ? "bg-gray-50 py-6 rounded-lg" : "py-4"
      )}
    >
      {isBot ? (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-study-100 flex items-center justify-center">
          <BookOpenText className="h-5 w-5 text-study-600" />
        </div>
      ) : (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-700 text-sm font-medium">You</span>
        </div>
      )}
      
      <div className="flex flex-col flex-1">
        <div className="flex items-center mb-1">
          <span className="font-medium mr-2">{isBot ? 'Study AI' : 'You'}</span>
          <span className="text-xs text-gray-500">{formattedTime}</span>
        </div>
        <div className="prose prose-gray max-w-none">
          <p className="whitespace-pre-wrap">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
