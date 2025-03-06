
import React from 'react';
import { BookOpenText, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <BookOpenText className="h-7 w-7 text-study-500" />
              <span className="text-xl font-display font-medium text-gray-900">Study AI</span>
            </div>
            <p className="text-gray-600 mb-6">
              Revolutionize your study sessions with an AI chatbot that understands your specific lecture material.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-study-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-study-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-study-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-study-500 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-6">Product</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-study-500 transition-colors">Features</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-study-500 transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-study-500 transition-colors">Pricing</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-study-500 transition-colors">Testimonials</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-6">Resources</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-study-500 transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-study-500 transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-study-500 transition-colors">Tutorials</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-study-500 transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-study-500 transition-colors">About</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-study-500 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-study-500 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-study-500 transition-colors">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Study AI. All rights reserved.
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
