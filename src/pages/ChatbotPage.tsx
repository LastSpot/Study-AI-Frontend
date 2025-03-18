// Import necessary dependencies and components
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Send, Menu, X, LogOut, ChevronUp, PlusCircle, Upload, Moon, Sun, Pencil, Check, Trash2 } from 'lucide-react';
import ChatMessage from '@/components/ChatMessage';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

// Define interfaces for data structures
interface Message {
  id: string;          // Unique identifier for each message
  text: string;        // Content of the message
  isBot: boolean;      // Whether the message is from the bot (true) or user (false)
  timestamp: Date;     // When the message was sent
}

interface Lecture {
  _id: string;         // MongoDB document ID
  title: string;       // Title of the lecture
  content?: string;    // Content of the PDF file
  email?: string;      // User's email who uploaded the lecture
  created_at?: string; // Timestamp when the lecture was created
  duration?: number;   // Duration of the lecture (if applicable)
}

// Initial welcome message displayed when starting a new chat
const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Hi there! Let get started! Let me know what topic you want us to study today by uploading a PDF of your desired lecture.',
    isBot: true,
    timestamp: new Date()
  }
];

const ChatbotPage: React.FC = () => {
  useEffect(() => {
    document.title = "Study AI";
  }, []);

  // Authentication and API context
  const { user, api } = useAuth();

  // Chat state management
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatBot, setChatBot] = useState(null);

  // UI state management
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Lecture management state
  const [pastlessons, setPastlessons] = useState([]);
  const [currentLectureId, setCurrentLectureId] = useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = useState("New lecture");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState("");

  // Theme context for light/dark mode
  const { theme, setTheme } = useTheme();

  // DOM element references
  const messagesEndRef = useRef<HTMLDivElement>(null);     // For auto-scrolling to bottom
  const chatContainerRef = useRef<HTMLDivElement>(null);   // Main chat container
  const fileInputRef = useRef<HTMLInputElement>(null);     // Hidden file input for PDF upload
  const titleInputRef = useRef<HTMLInputElement>(null);    // Title input field when editing

  // Handle responsive sidebar behavior
  // Ensures sidebar is always open in desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Fetches and sorts the list of past lessons from the backend
   * - Retrieves all lessons associated with the user
   * - Sorts them by creation date (newest first)
   * - Updates the pastlessons state
   */
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

  // Load past lessons when component mounts
  useEffect(() => {
    fetchPastlessons();
  }, []);

  /**
   * Handles the selection of a lesson from the sidebar
   * - Loads the lesson content from the backend
   * - Updates the current lecture context
   * - Initializes a new chat session with the lesson content
   * - Displays appropriate loading and context messages
   * 
   * @param lessonId - The MongoDB ID of the selected lesson
   */
  const handlelessonselect = async (lessonId: string) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/lessons/${lessonId}`);
      const lesson = response.data;
      
      if (!lesson || !lesson.title) {
        console.error('Invalid lesson data received:', lesson);
        throw new Error('Invalid lesson data received from server');
      }
      
      // Update the current lecture context
      setCurrentLectureId(lessonId);
      setCurrentTitle(lesson.title);

      // Clear previous chat and add context switch message
      const contextMessage: Message = {
        id: Date.now().toString(),
        text: 'So we are changing our topic? Sweet, give me a moment to read through our old topic first, my memory is that of a goldfish.',
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages([contextMessage]);

      // Initialize new chat session with the lesson content
      const newChatBot = await api.post('/chat/', {
        context: lesson.content
      });

      setChatBot(newChatBot.data.session_id);

      const newBotResponse: Message = {
        id: Date.now().toString(),
        text: 'Ok, seems like my memory still works. So what about this thing do you want to discuss?',
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newBotResponse]);
    } catch (error) {
      console.error('Error fetching lesson content:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Sorry, I encountered an error loading the lesson. Please try again.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setCurrentTitle("New lecture");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Toggles the sidebar visibility state
   * - On mobile: Shows/hides the full sidebar
   * - On desktop: Expands/collapses the sidebar
   */
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  /**
   * Handles scroll events in the chat container
   * - Shows scroll-to-bottom button when not at bottom
   * - Hides button when at bottom or near bottom (within 100px)
   */
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

  /**
   * Auto-scrolls to the bottom of the chat when new messages are added
   */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  /**
   * Handles sending a message in the chat
   * - Prevents empty messages
   * - Requires an active lesson
   * - Sends message to backend chat API
   * - Updates UI with user message and bot response
   * - Handles loading states and errors
   * 
   * @param e - Form submit event
   */
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
        text: 'Please upload a lesson PDF first before we can start our discussion. My dog ate my notes so I do not remember anything from the lecture.',
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage, botResponse]);
      setInputMessage('');
      return;
    }
    
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
      // Send message to chat backend with session ID
      const response = await api.post('/chat/send', {
        message: inputMessage,
        session_id: chatBot
      });

      const botResponse: Message = {
        id: Date.now().toString(),
        text: response.data,
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

  /**
   * Handles file upload for new lessons
   * - Creates FormData with file and metadata
   * - Uploads to backend for parsing
   * - Creates new lesson and chat session
   * - Updates UI with new lesson and welcome messages
   * 
   * @param file - The PDF file to upload
   */
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', file.name.replace(/\.[^/.]+$/, "")); // Remove file extension for title
      formData.append('email', user.email);
      
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
        text: 'Great! Give me a moment to read through our lesson material first, I was a bit lazy over the weekend.',
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages([INITIAL_MESSAGES[0], botResponse]);

      // Initialize new chat session with the lesson content
      const newChatBot = await api.post('/chat/', {
        context: newLesson.content
      });

      setChatBot(newChatBot.data.session_id);

      const newBotResponse: Message = {
        id: Date.now().toString(),
        text: 'Alrighty, I am ready! So what should we start with?',
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotResponse]);
      
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

  /**
   * Handles file input change event
   * - Triggers when user selects a PDF file
   * - Passes selected file to handleFileUpload
   * 
   * @param e - Input change event
   */
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  /**
   * Scrolls the chat container to the bottom
   * - Used for new messages and manual scroll button
   * - Smooth scrolling behavior
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Starts a new chat session
   * - Resets messages to initial welcome
   * - Clears current lecture context
   * - Resets title to default
   */
  const startNewChat = () => {
    setMessages(INITIAL_MESSAGES);
    setCurrentLectureId(null);
    setCurrentTitle("New lecture");
  };

  /**
   * Initiates title editing mode
   * - Sets temporary title to current title
   * - Enables edit mode
   * - Focuses and selects input field
   */
  const handleTitleEdit = () => {
    setTempTitle(currentTitle);
    setIsEditingTitle(true);
    setTimeout(() => {
      titleInputRef.current?.focus();
      titleInputRef.current?.select();
    }, 0);
  };

  /**
   * Saves the edited title
   * - Validates title is not empty
   * - Updates backend if lesson exists
   * - Updates local state and UI
   * - Refreshes lesson list to show new title
   */
  const handleTitleSave = async () => {
    if (!tempTitle.trim()) return;
    
    if (currentLectureId) {
      try {
        // Update title in backend
        await api.put(`/lessons/update-title`, {
          lesson_id: currentLectureId,
          new_title: tempTitle
        });
        
        setCurrentTitle(tempTitle);
        // Refresh lessons list to update sidebar
        await fetchPastlessons();
      } catch (error) {
        console.error('Error updating title:', error);
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

  /**
   * Handles keyboard events for title editing
   * - Enter: Saves the title
   * - Escape: Cancels editing
   * 
   * @param e - Keyboard event
   */
  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setIsEditingTitle(false);
      setTempTitle(currentTitle);
    }
  };

  /**
   * Handles lesson deletion
   * - Removes lesson from backend
   * - Updates UI if deleting current lesson
   * - Refreshes lesson list
   * - Prevents event bubbling to lesson selection
   * 
   * @param lessonId - ID of lesson to delete
   * @param e - Mouse event
   */
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
    // Main layout container
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar Component
          - Fixed position on mobile, relative on desktop
          - Slides in from left on mobile
          - Always visible but collapsed on desktop
          - Solid background on mobile, semi-transparent on desktop */}
      <div 
        className={cn(
          "h-full border-r transition-all duration-300 fixed md:relative z-30",
          "bg-background md:bg-muted/50",
          isSidebarOpen 
            ? "w-64 translate-x-0 opacity-100" 
            : "w-0 -translate-x-full md:w-20 md:translate-x-0 md:opacity-100 hidden md:block"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header
              - Contains close button (mobile only)
              - App title (desktop only)
              - Theme toggle button */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className={`flex items-center ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
              {/* Close button - Only visible on mobile when sidebar is open */}
              {isSidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                  className="md:hidden mr-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
              {isSidebarOpen && <span className="text-xl font-display font-medium hidden md:block">Study AI</span>}
            </div>
            {/* Theme Toggle Button */}
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
          
          {/* Sidebar Content
              - Contains New Chat button
              - List of past lessons
              - Only visible when sidebar is open */}
          <div className="flex-1 overflow-y-auto p-4">
            {isSidebarOpen && (
              <>
                {/* New Chat Button - Resets current chat and lesson */}
                <Button 
                  onClick={startNewChat}
                  className="w-full flex items-center justify-start gap-2 mb-4 bg-background border hover:bg-accent text-foreground"
                >
                  <PlusCircle className="h-4 w-4" />
                  New chat
                </Button>
                
                {/* Past Lessons List
                    - Displays all uploaded lessons
                    - Shows "No lessons yet" if empty
                    - Each lesson has delete button (visible on hover) */}
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
                          onClick={() => {
                            handlelessonselect(lecture._id);
                            // Close sidebar on mobile after selecting a lesson
                            if (window.innerWidth < 768) {
                              setIsSidebarOpen(false);
                            }
                          }}
                          className="flex-1 text-left text-sm"
                        >
                          {lecture.title}
                        </button>
                        {/* Delete Lesson Button */}
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
          
          {/* Sidebar Footer
              - Contains logout button
              - Text only visible when sidebar is open */}
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
      
      {/* Main Chat Area
          - Flexible width container
          - Contains mobile header, messages, and input area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header
            - Only visible on mobile screens
            - Contains menu button and app title
            - Title only visible when sidebar is closed */}
        <div className="md:hidden flex items-center justify-between border-b p-4">
          <button
            onClick={toggleSidebar}
            className="text-foreground focus:outline-none"
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Study AI text - Only visible when sidebar is closed */}
          {!isSidebarOpen && (
            <span className="text-lg font-display font-medium">Study AI</span>
          )}
          
          {/* Maintain layout balance */}
          <div className="w-6"></div>
        </div>

        {/* Mobile Sidebar Overlay
            - Dark overlay behind sidebar on mobile
            - Only visible when sidebar is open
            - Clicking closes the sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        
        {/* Chat Messages Container
            - Scrollable container for messages
            - Contains title bar and message list */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto"
        >
          {/* Title Bar
              - Sticky header showing current lecture title
              - Contains edit button when lecture is selected
              - Switches between display and edit modes */}
          <div className="sticky top-0 z-10 bg-background border-b p-4 shadow-sm">
            {isEditingTitle ? (
              // Title Edit Mode
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
              // Title Display Mode
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

          {/* Messages List
              - Displays all chat messages
              - Shows loading indicator when processing
              - Auto-scrolls to bottom on new messages */}
          <div className="pt-2 pb-24 min-h-full">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id}
                message={message.text}
                isBot={message.isBot}
                timestamp={message.timestamp}
              />
            ))}
            {/* Loading Indicator */}
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
        
        {/* Scroll to Bottom Button
            - Fixed position button
            - Only visible when not at bottom of chat
            - Smoothly scrolls to latest messages */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-32 right-4 bg-background bg-opacity-80 backdrop-blur-sm rounded-full p-2 shadow-lg border text-foreground hover:text-primary transition-colors"
            aria-label="Scroll to bottom"
          >
            <ChevronUp className="h-5 w-5 rotate-180" />
          </button>
        )}
        
        {/* Message Input Area
            - Fixed to bottom of chat
            - Contains file upload or message input
            - Shows appropriate placeholder based on state */}
        <div className="absolute bottom-0 left-0 right-0 border-t bg-background">
          <form onSubmit={handleSendMessage} className="p-4">
            <div className="relative flex items-center">
              {/* Message Input Field
                  - Full width input
                  - Different placeholders based on lecture selection
                  - Disabled during loading or when no lecture selected */}
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={currentLectureId ? "Ask something about your lecture notes..." : "Please upload a PDF first to start chatting"}
                className="w-full p-4 pr-24 pl-12 rounded-full border focus:border-primary focus:ring-primary focus:outline-none bg-background"
                disabled={isLoading || isUploading || !currentLectureId}
              />
              {/* Hidden File Input */}
              {!currentLectureId && (
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  className="hidden"
                  accept=".pdf"
                />
              )}
              {/* Upload Button */}
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
              {/* Send Button */}
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
