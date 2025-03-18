import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  useEffect(() => {
    document.title = "Forgot password";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Link to="/" className="absolute top-4 left-4 flex items-center space-x-2">
        <span className="text-xl font-display font-medium text-gray-900">
          Study AI
        </span>
      </Link>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-medium mb-2 text-gray-900">Need to reset your password?</h1>
          <p className="text-gray-600">Follow the instructions below</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-study-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-study-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4">Contact Us to Reset Your Password</h3>
            <p className="text-gray-600 mb-6">
              To reset your password, please send an email to{' '}
              <a 
                href="mailto:personalstudyai@gmail.com" 
                className="text-study-500 hover:text-study-600 font-medium"
              >
                personalstudyai@gmail.com
              </a>
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong>Important:</strong> You must send the email from the same email address associated with your account. 
                This helps us verify your identity and protect your account security.
              </p>
            </div>
            <Link to="/login">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
