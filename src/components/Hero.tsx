
import React, { useState } from 'react';
import { ChevronRight, Upload, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Thanks for subscribing!",
        description: "We'll keep you updated with the latest news.",
      });
      setEmail('');
    }
  };

  return (
    <section className="pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-8 animate-fade-in">
            <div>
              <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-study-50 text-study-600 rounded-full">
                Your Personal Study Companion
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                AI Study Buddy <br />
                <span className="text-study-500">For Your Lecture Notes</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 md:w-5/6 leading-relaxed">
                Upload your lecture PDFs and get an AI chatbot with hyperfocus context to help you study smarter, not harder.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary group" asChild>
                <Link to="/signup">
                  Try For Free
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-1 text-study-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No Credit Card Required
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-1 text-study-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No Installation Needed
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-up">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-study-100 rounded-full opacity-40 blur-3xl"></div>
            <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-study-200/40 rounded-full opacity-40 blur-3xl"></div>
            
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-study-400 to-study-300"></div>
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-sm font-medium text-gray-500">Study AI Chat</div>
              </div>
              
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/e813e076-c30c-4761-a1cb-1db67af1a642.png" 
                      alt="User" 
                      className="w-5 h-5" 
                    />
                  </div>
                  <div className="glass-card p-3 rounded-lg rounded-tl-none max-w-[85%]">
                    <p className="text-sm text-gray-700">I've uploaded my lecture notes on quantum computing. Can you help me understand the concept of quantum entanglement?</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 flex-row-reverse">
                  <div className="flex-shrink-0 w-8 h-8 bg-study-500 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <div className="glass-card p-3 rounded-lg rounded-tr-none max-w-[85%] shadow-sm bg-study-50/80">
                    <p className="text-sm text-gray-700">
                      Based on your lecture notes, quantum entanglement is a physical phenomenon where pairs of particles remain connected so that actions performed on one affect the other, regardless of distance. Professor Johnson explained it on page 14 using the example of entangled photons...
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/e813e076-c30c-4761-a1cb-1db67af1a642.png" 
                      alt="User" 
                      className="w-5 h-5" 
                    />
                  </div>
                  <div className="glass-card p-3 rounded-lg rounded-tl-none max-w-[85%]">
                    <p className="text-sm text-gray-700">That makes sense! Can you explain how this relates to quantum computing applications?</p>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="animate-pulse flex space-x-1">
                    <div className="h-2 w-2 bg-study-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-study-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-study-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -z-10 -bottom-6 -right-6">
              <div className="relative w-64 h-64 bg-study-100 rounded-lg border border-gray-200 shadow-sm animate-float">
                <div className="absolute -top-3 -left-3 w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center border border-gray-100">
                  <Upload className="h-6 w-6 text-study-500" />
                </div>
                <div className="h-full flex flex-col items-center justify-center p-6">
                  <div className="w-full h-4 bg-gray-200 rounded-full mb-2"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded-full mb-4"></div>
                  <div className="w-1/2 h-10 bg-study-500 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Email subscription section */}
      <div className="container mx-auto px-4 md:px-6 mt-16">
        <div className="bg-study-50 rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Stay updated with our latest features</h2>
            <p className="text-gray-600 mb-8">Be the first to know about new features and updates. No spam, promise!</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-study-500 focus:border-study-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="bg-study-500 hover:bg-study-600 text-white py-3 px-6 rounded-lg">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
