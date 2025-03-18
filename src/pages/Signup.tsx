import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpenText, UserPlus, User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Signup = () => {

  useEffect(() => {
    document.title = "Signup";
  }, []);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(formData.full_name, formData.email, formData.password);
      toast({
        title: "Account created!",
        description: "Your account has been created successfully.",
      });
      navigate('/chat');
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "An error occurred during signup.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Link to="/" className="absolute top-4 left-4 flex items-center space-x-2">
        <span className="text-xl font-display font-medium text-gray-900">Study AI</span>
      </Link>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-medium mb-2 text-gray-900">Join Study AI</h1>
          <p className="text-gray-600">Create your account and start learning</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="full_name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your name"
                    className="pl-10 w-full h-12 bg-gray-50 border border-gray-300 rounded-xl focus:ring-study-500 focus:border-study-500 px-4 text-black"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              
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
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="pl-10 w-full h-12 bg-gray-50 border border-gray-300 rounded-xl focus:ring-study-500 focus:border-study-500 px-4 text-black"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Create a password"
                    className="pl-10 w-full h-12 bg-gray-50 border border-gray-300 rounded-xl focus:ring-study-500 focus:border-study-500 px-4 text-black pr-12"
                    required
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-study-500 focus:ring-study-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-study-500 hover:text-study-600">Terms</a> and <a href="#" className="text-study-500 hover:text-study-600">Privacy Policy</a>
              </label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-study-500 hover:bg-study-600 text-white font-medium rounded-xl flex items-center justify-center"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Create account
            </Button>
          </form>
          
          <p className="mt-5 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-study-500 hover:text-study-600">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
