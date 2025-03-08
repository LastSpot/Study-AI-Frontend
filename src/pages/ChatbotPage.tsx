import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Send, Menu, X, LogOut, ChevronUp, PlusCircle, Upload, Moon, Sun, Pencil, Check } from 'lucide-react';
import ChatMessage from '@/components/ChatMessage';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface Lecture {
  id: string;
  title: string;
  timestamp: string;
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
  const { user, api } = useAuth();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [pastLectures, setPastLectures] = useState([]);
  const [currentLectureId, setCurrentLectureId] = useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = useState("New lecture");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState("");
  const { theme, setTheme } = useTheme();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const fetchPastLectures = async () => {
    try {
      const response = await api.get('/lectures/');
      setPastLectures(response.data);
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };

  // Fetch past lectures
  useEffect(() => {
    fetchPastLectures();
  }, []);

  const handleLectureSelect = async (lectureId: string) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/lectures/${lectureId}`);
      const data = response.data;
      
      setCurrentLectureId(lectureId);
      setCurrentTitle(data.title);
      // Add a message to indicate the context switch
      const contextMessage: Message = {
        id: Date.now().toString(),
        text: `Switched to lecture context: "${data.title}". You can now ask questions about this material.`,
        isBot: true,
        timestamp: new Date()
      };
      setMessages([contextMessage]);
    } catch (error) {
      console.error('Error fetching lecture content:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleSendMessage = async (e: React.FormEvent) => {
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
    
    try {
      const payload = {
        message: inputMessage,
        lectureId: currentLectureId
      };

      const response = await api.post('/chat', payload, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      
      const botResponse: Message = {
        id: Date.now().toString(),
        text: response.data.response,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting chat response:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Sorry, I encountered an error processing your request. Please try again.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      await api.post('/lectures/update-lecture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const botResponse: Message = {
        id: Date.now().toString(),
        text: `I've processed your lecture notes: "${file.name}". Let talk about it!`,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      // Refresh the lectures list after upload
      const lecturesResponse = await api.get('/lectures/update-lecture');
      setPastLectures(lecturesResponse.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Sorry, I encountered an error uploading your file. Please try again.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startNewChat = () => {
    setMessages(INITIAL_MESSAGES);
    setCurrentLectureId(null);
    setCurrentTitle("New lecture");
  };

  const handleTitleEdit = () => {
    setTempTitle(currentTitle);
    setIsEditingTitle(true);
    setTimeout(() => {
      titleInputRef.current?.focus();
      titleInputRef.current?.select();
    }, 0);
  };

  const handleTitleSave = async () => {
    if (!tempTitle.trim()) return;
    
    if (currentLectureId) {
      try {
        await api.patch(`/lectures/${currentLectureId}`, { title: tempTitle });
        setCurrentTitle(tempTitle);
        // Refresh lectures list to update sidebar
        const lecturesResponse = await api.get('/lectures');
        setPastLectures(lecturesResponse.data);
      } catch (error) {
        console.error('Error updating title:', error);
      }
    } else {
      setCurrentTitle(tempTitle);
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setIsEditingTitle(false);
      setTempTitle(currentTitle);
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <div 
        className={`h-full bg-muted/50 border-r transition-all duration-300 absolute md:relative z-30 ${
          isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 -translate-x-full md:w-20 md:opacity-100 md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <div className={`flex items-center ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
              {isSidebarOpen && <span className="text-xl font-display font-medium">Study AI</span>}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="ml-auto"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {isSidebarOpen && (
              <>
                <Button 
                  onClick={startNewChat}
                  className="w-full flex items-center justify-start gap-2 mb-4 bg-background border hover:bg-accent text-foreground"
                >
                  <PlusCircle className="h-4 w-4" />
                  New chat
                </Button>
                
                <div className="space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase mb-2">Past Lectures</h3>
                  {pastLectures.length === 0 ? (
                    <p className="text-sm text-muted-foreground p-2">No lectures yet</p>
                  ) : (
                    console.log(pastLectures),
                    pastLectures.map((lecture) => (
                      <button
                        key={lecture.id}
                        onClick={() => handleLectureSelect(lecture.id)}
                        className={cn(
                          "w-full text-left cursor-pointer p-2 rounded hover:bg-accent text-sm",
                          currentLectureId === lecture.id && "bg-accent"
                        )}
                      >
                        {lecture.title}
                      </button>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
          
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start text-foreground" asChild>
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
            className="text-foreground focus:outline-none"
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          <span className="text-lg font-display font-medium">Study AI</span>
          
          <div className="w-6"></div>
        </div>
        
        <div className="border-b p-4 flex items-center justify-between">
          {isEditingTitle ? (
            <div className="flex-1 flex items-center gap-2">
              <input
                ref={titleInputRef}
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onKeyDown={handleTitleKeyDown}
                onBlur={handleTitleSave}
                className="flex-1 bg-background border-b border-primary focus:outline-none text-lg font-medium py-1"
                placeholder="Enter lecture title..."
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleTitleSave}
                className="h-8 w-8"
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-medium">{currentTitle}</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleTitleEdit}
                className="h-8 w-8"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          )}
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
                  <div className="h-6 w-6 rounded-full bg-muted mr-2"></div>
                  <div className="h-4 w-24 bg-muted rounded"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-32 right-4 bg-background bg-opacity-80 backdrop-blur-sm rounded-full p-2 shadow-lg border text-foreground hover:text-primary transition-colors"
            aria-label="Scroll to bottom"
          >
            <ChevronUp className="h-5 w-5 rotate-180" />
          </button>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 border-t bg-background">
          <form onSubmit={handleSendMessage} className="p-4">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask something about your lecture notes..."
                className="w-full p-4 pr-24 pl-12 rounded-full border focus:border-primary focus:ring-primary focus:outline-none bg-background"
                disabled={isLoading || isUploading}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute left-1.5 h-10 w-10 p-0 rounded-full hover:bg-accent"
                variant="ghost"
                disabled={isLoading || isUploading}
              >
                <Upload className="h-5 w-5" />
              </Button>
              <Button
                type="submit"
                className="absolute right-1.5 h-10 w-10 p-0 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-50"
                disabled={!inputMessage.trim() || isLoading || isUploading}
              >
                <Send className="h-5 w-5 text-primary-foreground" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
