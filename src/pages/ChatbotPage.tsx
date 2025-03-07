import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Send, Menu, X, LogOut, ChevronUp, PlusCircle } from 'lucide-react';
import ChatMessage from '@/components/ChatMessage';
import FileUpload from '@/components/FileUpload';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Hi there! I\'m your Study AI assistant. Upload your lecture notes and I\'ll help you understand and review the content. What would you like to learn today?',
    isBot: true,
    timestamp: new Date()
  }
];

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!chatContainerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isNotAtBottom = scrollHeight - scrollTop - clientHeight > 100;
      
      setShowScrollButton(isNotAtBottom);
    };
    
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
      return () => chatContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I'm your Study AI assistant. This is a simulated response to "${inputMessage}". Upload your lecture notes for me to provide more specific assistance.`,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleFileUpload = (file: File) => {
    setIsUploading(true);
    
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now().toString(),
        text: `I've processed your lecture notes: "${file.name}". You can now ask questions about this material.`,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsUploading(false);
    }, 2000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startNewChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <div 
        className={`h-full bg-gray-50 border-r transition-all duration-300 absolute md:relative z-30 ${
          isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 -translate-x-full md:w-20 md:opacity-100 md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Link to="/" className={`flex items-center ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
              <img 
                src="/lovable-uploads/750f0573-2828-4e93-af20-a16361b9f5e6.png" 
                alt="Study AI Logo" 
                className="h-8 w-auto" 
              />
              {isSidebarOpen && <span className="text-xl font-display font-medium text-gray-900 ml-2">Study AI</span>}
            </Link>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {isSidebarOpen && (
              <>
                <Button 
                  onClick={startNewChat}
                  className="w-full flex items-center justify-start gap-2 mb-4 bg-white border hover:bg-gray-50"
                >
                  <PlusCircle className="h-4 w-4" />
                  New chat
                </Button>
                
                <div className="space-y-1">
                  <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Recent chats</h3>
                  <div className="cursor-pointer p-2 rounded hover:bg-gray-100 text-sm">
                    Physics 101 - Week 3
                  </div>
                  <div className="cursor-pointer p-2 rounded hover:bg-gray-100 text-sm">
                    Chemistry - Lab Session
                  </div>
                  <div className="cursor-pointer p-2 rounded hover:bg-gray-100 text-sm">
                    Introduction to Psychology
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start text-gray-700" asChild>
              <Link to="/">
                <LogOut className="h-5 w-5 mr-2" />
                <span className={isSidebarOpen ? 'block' : 'hidden'}>Sign out</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="md:hidden flex items-center justify-between border-b p-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 focus:outline-none"
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/750f0573-2828-4e93-af20-a16361b9f5e6.png" 
              alt="Study AI Logo" 
              className="h-6 w-auto" 
            />
            <span className="text-lg font-display font-medium text-gray-900 ml-2">Study AI</span>
          </Link>
          
          <div className="w-6"></div>
        </div>
        
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto"
        >
          <div className="pt-2 pb-24 min-h-full">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id}
                message={message.text}
                isBot={message.isBot}
                timestamp={message.timestamp}
              />
            ))}
            {isLoading && (
              <div className="px-4 py-2">
                <div className="flex items-center animate-pulse">
                  <div className="h-6 w-6 rounded-full bg-gray-200 mr-2"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-32 right-4 bg-white bg-opacity-80 backdrop-blur-sm rounded-full p-2 shadow-lg border text-gray-600 hover:text-study-500 transition-colors"
            aria-label="Scroll to bottom"
          >
            <ChevronUp className="h-5 w-5 rotate-180" />
          </button>
        )}
        
        <div className="absolute bottom-24 left-0 right-0 bg-white border-t">
          <FileUpload onUpload={handleFileUpload} />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 border-t bg-white">
          <form onSubmit={handleSendMessage} className="p-4">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask something about your lecture notes..."
                className="w-full p-4 pr-14 rounded-full border border-gray-300 focus:border-study-500 focus:ring-study-500 focus:outline-none"
                disabled={isLoading || isUploading}
              />
              <Button
                type="submit"
                className="absolute right-1.5 h-10 w-10 p-0 rounded-full bg-study-500 hover:bg-study-600 disabled:opacity-50"
                disabled={!inputMessage.trim() || isLoading || isUploading}
              >
                <Send className="h-5 w-5 text-white" />
              </Button>
            </div>
            <p className="mt-2 text-xs text-center text-gray-500">
              Upload your lecture PDF for more accurate answers
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
