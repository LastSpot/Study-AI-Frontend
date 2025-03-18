import React from 'react';
import { Mail } from 'lucide-react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 mb-16">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img 
                src="/study-ai-brain-no-bg.png" 
                alt="Study AI Logo" 
                className="h-10 w-auto" 
              />
              <span className="text-xl font-display font-medium text-gray-900">Study AI</span>
            </div>
            <p className="text-gray-600 mb-6">
              Transform your study sessions with an AI chatbot tailored to your lecture material.
            </p>
            <div className="flex space-x-4">
              {/* <a href="https://www.instagram.com" className="text-gray-500 hover:text-study-500 transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a> */}
              <a href="https://www.linkedin.com/in/michael-minh-le/" className="text-gray-500 hover:text-study-500 transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="mailto:personalstudyai@gmail.com" className="text-gray-500 hover:text-study-500 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Made with care by @Study-AI. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-study-500 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-study-500 transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-study-500 transition-colors text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
