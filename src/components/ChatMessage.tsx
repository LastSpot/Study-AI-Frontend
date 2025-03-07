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
        isBot ? "bg-muted/50 py-6" : "py-4 justify-end"
      )}
    >
      {isBot && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <BookOpenText className="h-5 w-5 text-primary" />
        </div>
      )}
      
      <div className={cn(
        "flex flex-col max-w-3xl",
        isBot ? "flex-1" : "items-end"
      )}>
        <div className={cn(
          "flex items-center mb-1",
          isBot ? "" : "flex-row-reverse"
        )}>
          <span className="font-medium mr-2">{isBot ? 'Study AI' : 'You'}</span>
          <span className="text-xs text-muted-foreground">{formattedTime}</span>
        </div>
        <div className={cn(
          "prose prose-gray dark:prose-invert max-w-none",
          isBot ? "" : "bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-none"
        )}>
          <p className="whitespace-pre-wrap m-0">{message}</p>
        </div>
      </div>
      
      {!isBot && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground text-sm font-medium">You</span>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
