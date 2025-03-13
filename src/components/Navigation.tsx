
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/study-ai-brain-no-bg.png" alt="Study AI Logo" className="h-12 w-auto" />
            <span className="text-xl font-display font-medium text-gray-900">Study AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-study-500 transition-colors subtle-underline"
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="text-gray-700 hover:text-study-500 transition-colors subtle-underline"
            >
              Pricing
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700 hover:text-study-500" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-study-500 hover:bg-study-600 text-white rounded-full px-6" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-4 animate-fade-in">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-study-500 transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link 
            to="/pricing" 
            className="text-gray-700 hover:text-study-500 transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <div className="flex flex-col space-y-2 pt-2 border-t">
            <Button variant="ghost" className="text-gray-700 justify-center" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-study-500 hover:bg-study-600 text-white rounded-full" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
