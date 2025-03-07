
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpenText, Mail, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email.trim()) return;
    
    // Show toast notification
    toast({
      title: "Password reset email sent",
      description: "Check your inbox for instructions to reset your password.",
    });
    
    // Show success message
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Link to="/" className="absolute top-4 left-4 flex items-center space-x-2">
        <img src="/lovable-uploads/750f0573-2828-4e93-af20-a16361b9f5e6.png" alt="Study AI Logo" className="h-8 w-auto" />
        <span className="text-xl font-display font-medium text-gray-900">Study AI</span>
      </Link>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-medium mb-2 text-gray-900">Forgot password?</h1>
          <p className="text-gray-600">Enter your email to reset your password</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="pl-10 w-full h-12 bg-gray-50 border border-gray-300 rounded-xl focus:ring-study-500 focus:border-study-500 px-4"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-study-500 hover:bg-study-600 text-white font-medium rounded-xl flex items-center justify-center"
              >
                Send reset instructions
              </Button>
              
              <div className="text-center">
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-800 flex items-center justify-center">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to login
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Check your email</h3>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to<br /><strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Didn't receive the email? Check your spam folder or
                <button 
                  type="button"
                  onClick={() => handleSubmit(new Event('click') as unknown as React.FormEvent)}
                  className="text-study-500 hover:text-study-600 ml-1"
                >
                  try again
                </button>
              </p>
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
