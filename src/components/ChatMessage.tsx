/**
 * ChatMessage Component
 * Renders a single message in the chat interface.
 * Features:
 * - Different styles for bot and user messages
 * - Displays message timestamp
 * - Includes avatars for both bot and user
 * - Responsive design with proper spacing and alignment
 */
import React from 'react';
import { BookOpenText } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Props interface for the ChatMessage component
 * @property message - The text content of the message
 * @property isBot - Boolean flag indicating if the message is from the bot (true) or user (false)
 * @property timestamp - Date object representing when the message was sent
 */
interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, timestamp }) => {
  // Format timestamp to show only hours and minutes in local time
  const formattedTime = timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    // Container with conditional styling based on sender (bot/user)
    <div 
      className={cn(
        "flex gap-4 mb-4 px-4 md:px-6", 
        isBot ? "bg-muted/50 py-6" : "py-4 justify-end"
      )}
    >
      {/* Bot Avatar - Only shown for bot messages */}
      {isBot && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-white bg-primary/10 flex items-center justify-center">
          <img src="/study-ai-brain-no-bg.png" alt="Study AI" className="h-7 w-7" />
        </div>
      )}
      
      {/* Message Content Container */}
      <div className={cn(
        "flex flex-col max-w-3xl",
        isBot ? "flex-1" : "items-end"
      )}>
        {/* Timestamp Display */}
        <div className={cn(
          "flex items-center mb-1",
          isBot ? "" : "flex-row-reverse"
        )}>
          <span className="text-xs text-muted-foreground">{formattedTime}</span>
        </div>
        {/* Message Text with Styling */}
        <div className={cn(
          "prose prose-gray dark:prose-invert max-w-none",
          isBot ? "" : "bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-none"
        )}>
          <p className="whitespace-pre-wrap m-0">{message}</p>
        </div>
      </div>
      
      {/* User Avatar - Only shown for user messages */}
      {!isBot && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
