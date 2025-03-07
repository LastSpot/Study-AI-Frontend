import React from 'react';
import { Upload, BookText, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="h-8 w-8 text-white" />,
      title: "Upload Your Lecture",
      description: "Simply upload your lecture PDF and our AI will process it immediately.",
      color: "bg-study-500",
      delay: "delay-[100ms]"
    },
    {
      icon: <BookText className="h-8 w-8 text-white" />,
      title: "AI Analyzes Content",
      description: "Our system extracts key concepts and builds a knowledge base from your document.",
      color: "bg-study-600",
      delay: "delay-[300ms]"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-white" />,
      title: "Chat With Your AI",
      description: "Ask questions about your lecture and receive accurate, contextual responses.",
      color: "bg-study-700",
      delay: "delay-[500ms]"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-white" />,
      title: "Master Your Material",
      description: "Deepen your understanding through interactive conversation with your Study AI.",
      color: "bg-study-800",
      delay: "delay-[700ms]"
    }
  ];

  return (
    <section id="how-it-works" className="section relative bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 bg-study-50 text-study-600 rounded-full text-sm font-medium">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Study AI Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in minutes and transform how you study with your lecture materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center text-center animate-fade-in-up ${step.delay} relative`}
            >
              <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mb-5 shadow-lg`}>
                {step.icon}
              </div>
              <span className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center text-gray-600 font-medium mb-3">
                {index + 1}
              </span>
              <h3 className="text-xl font-medium mb-2 text-gray-900">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-12 left-full items-center justify-center w-12 z-10 transform -translate-x-6">
                  <ArrowRight className="w-8 h-8 text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center animate-fade-in">
          <div className="glass-card max-w-lg p-6 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-study-500 p-3 text-white">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2 text-gray-900">Ready to transform your study sessions?</h4>
                <p className="text-gray-600 mb-4">
                  Start using Study AI today and experience the power of having an AI study companion that knows your specific lecture material.
                </p>
                <a 
                  href="/signup" 
                  className="inline-flex items-center text-study-500 font-medium hover:text-study-600 transition-colors"
                >
                  Get Started Free
                  <svg className="ml-1 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
