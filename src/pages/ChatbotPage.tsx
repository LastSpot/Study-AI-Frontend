import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Send, Menu, X, LogOut, ChevronUp, PlusCircle, Upload, Moon, Sun, Pencil, Check, Trash2 } from 'lucide-react';
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
  _id: string;  // MongoDB's _id field
  title: string;
  content?: string;
  email?: string;
  created_at?: string;
  duration?: number;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Hi there! I\'m your Study AI assistant. Please upload your lecture notes (PDF) to get started.',
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
  const [pastlessons, setPastlessons] = useState([]);
  const [currentLectureId, setCurrentLectureId] = useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = useState("New lecture");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState("");
  const { theme, setTheme } = useTheme();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const fetchPastlessons = async () => {
    try {
      const response = await api.get('/lessons/');
      
      // Sort lessons by timestamp in descending order (newest first)
      const sortedLessons = response.data.lessons.sort((a: Lecture, b: Lecture) => 
        new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      );
      
      setPastlessons(sortedLessons);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  // Fetch past lessons
  useEffect(() => {
    fetchPastlessons();
  });

  const handlelessonselect = async (lessonId: string) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/lessons/${lessonId}`);
      const lesson = response.data;
      
      if (!lesson || !lesson.title) {  // Only check for required fields
        console.error('Invalid lesson data received:', lesson);
        throw new Error('Invalid lesson data received from server');
      }
      
      // Update the current lecture context
      setCurrentLectureId(lessonId);  // Use the ID we received as parameter
      setCurrentTitle(lesson.title);

      // Clear previous chat and add context switch message
      const contextMessage: Message = {
        id: Date.now().toString(),
        text: `Switched to lesson: "${lesson.title}". You can now ask questions about this material.${
          lesson.created_at ? ` The lesson was created on ${new Date(lesson.created_at).toLocaleDateString()}.` : ''
        }`,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages([contextMessage]);
    } catch (error) {
      console.error('Error fetching lesson content:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Sorry, I encountered an error loading the lesson. Please try again.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      // Reset to default title on error
      setCurrentTitle("New lecture");
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

    // Check if any lesson is uploaded
    if (!currentLectureId) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        isBot: false,
        timestamp: new Date()
      };
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Please upload a lesson PDF first before we can start our discussion. Click the upload button below to get started!',
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage, botResponse]);
      setInputMessage('');
      return;
    }
    
    // Rest of the existing handleSendMessage logic
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

      const response = await api.post('/chat', payload);
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
      formData.append('title', file.name.replace(/\.[^/.]+$/, "")); // Remove file extension for title
      formData.append('email', user.email); // Add user's email from auth context
      
      // Send file to backend for parsing and lesson creation
      const response = await api.post('/lessons/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const newLesson = response.data;
      
      // Update current lecture ID and title
      setCurrentLectureId(newLesson._id);
      setCurrentTitle(newLesson.title);
      
      const botResponse: Message = {
        id: Date.now().toString(),
        text: `Great! I've created a new lesson "${newLesson.title}" from your PDF. The content has been processed and you can now ask me questions about it.`,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages([INITIAL_MESSAGES[0], botResponse]);
      
      // Refresh the lessons list after upload
      await fetchPastlessons();
    } catch (error) {
      console.error('Error uploading and processing file:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Sorry, I encountered an error processing your PDF file. Please make sure it\'s a valid PDF document and try again.',
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
        // Use the update-title endpoint
        await api.put(`/lessons/update-title`, {
          lesson_id: currentLectureId,
          new_title: tempTitle
        });
        
        setCurrentTitle(tempTitle);
        // Refresh lessons list to update sidebar
        const lessonsResponse = await api.get('/lessons/');
        const sortedLessons = lessonsResponse.data.lessons.sort((a: Lecture, b: Lecture) => 
          new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
        );
        setPastlessons(sortedLessons);
      } catch (error) {
        console.error('Error updating title:', error);
        // Show error in chat
        const errorMessage: Message = {
          id: Date.now().toString(),
          text: 'Sorry, I encountered an error updating the lesson title. Please try again.',
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
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

  const handleDeleteLesson = async (lessonId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering lesson selection
    try {
      await api.delete(`/lessons/${lessonId}`);
      
      // If we're deleting the current lesson, reset the state
      if (currentLectureId === lessonId) {
        setCurrentLectureId(null);
        setCurrentTitle("New lecture");
        setMessages(INITIAL_MESSAGES);
      }
      
      // Refresh the lessons list
      await fetchPastlessons();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Sorry, I encountered an error deleting the lesson. Please try again.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
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
                  <h3 className="text-xs font-medium text-muted-foreground uppercase mb-2">Past lessons</h3>
                  {pastlessons.length === 0 ? (
                    <p className="text-sm text-muted-foreground p-2">No lessons yet</p>
                  ) : (
                    pastlessons.map((lecture: Lecture) => (
                      <div
                        key={lecture._id}
                        className={cn(
                          "group flex items-center justify-between p-2 rounded hover:bg-accent",
                          currentLectureId === lecture._id && "bg-accent"
                        )}
                      >
                        <button
                          onClick={() => handlelessonselect(lecture._id)}
                          className="flex-1 text-left text-sm"
                        >
                          {lecture.title}
                        </button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleDeleteLesson(lecture._id, e)}
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
                <span className={isSidebarOpen ? 'block' : 'hidden'}>Log out</span>
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
        
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto"
        >
          <div className="sticky top-0 z-10 bg-background border-b p-4 shadow-sm">
            {isEditingTitle ? (
              <div className="flex items-center gap-2">
                <input
                  ref={titleInputRef}
                  type="text"
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  onKeyDown={handleTitleKeyDown}
                  onBlur={handleTitleSave}
                  className="flex-1 bg-background border-b-2 border-primary focus:outline-none text-lg font-medium py-1"
                  placeholder="Enter lesson title..."
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
                <h1 className="text-lg font-semibold">{currentTitle}</h1>
                {currentLectureId && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleTitleEdit}
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
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
                placeholder={currentLectureId ? "Ask something about your lecture notes..." : "Please upload a PDF first to start chatting"}
                className="w-full p-4 pr-24 pl-12 rounded-full border focus:border-primary focus:ring-primary focus:outline-none bg-background"
                disabled={isLoading || isUploading || !currentLectureId}
              />
              {!currentLectureId && (
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  className="hidden"
                  accept=".pdf"
                />
              )}
              {!currentLectureId && (
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute left-1.5 h-10 w-10 p-0 rounded-full hover:bg-accent"
                  variant="ghost"
                  disabled={isLoading || isUploading}
                >
                  <Upload className="h-5 w-5" />
                </Button>
              )}
              <Button
                type="submit"
                className="absolute right-1.5 h-10 w-10 p-0 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-50"
                disabled={!inputMessage.trim() || isLoading || isUploading || !currentLectureId}
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
