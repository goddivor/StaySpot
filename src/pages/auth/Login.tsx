/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { 
  Eye,
  EyeSlash,
  Google,
  Facebook,
  Apple,
  ArrowLeft,
  Lock,
  Profile
} from 'iconsax-react';
import Button from '@/components/Button';
import Logo from '@/components/ui/logo';
import { Input } from '@/components/Input';
import SpinLoader from '@/components/SpinLoader';
import { useToast } from '@/context/toast-context';

const Login: React.FC = () => {
  const { success, error } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      error('Missing Information', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      success('Welcome back!', 'You have been successfully logged in');
      
      // Redirect to dashboard or previous page
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
      
    } catch (err) {
      error('Login Failed', 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    success(`${provider} Login`, `Redirecting to ${provider} authentication...`);
    
    // Simulate social login redirect
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleForgotPassword = () => {
    window.location.href = '/password-reset';
  };

  const handleSignUp = () => {
    window.location.href = '/register';
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-200/40 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 bg-indigo-200/35 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-300/25 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Main login container */}
      <div className="w-full max-w-md relative">
        
        {/* Back button */}
        <Button
          onClick={handleBack}
          className="absolute -top-16 left-0 p-2 hover:bg-white/80 rounded-lg transition-colors backdrop-blur-sm"
        >
          <ArrowLeft color="#374151" size={24} />
        </Button>

        {/* Login card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-white/20">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div 
                className="cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={handleGoHome}
              >
                <Logo size={64} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your StaySpot account</p>
          </div>

          {/* Social login buttons */}
          <div className="space-y-3 mb-8">
            <Button
              onClick={() => handleSocialLogin('Google')}
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md flex items-center justify-center gap-3"
            >
              <Google color="#EA4335" size={20} />
              Continue with Google
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleSocialLogin('Facebook')}
                disabled={isLoading}
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2"
              >
                <Facebook color="#1877F2" size={20} />
                Facebook
              </Button>
              
              <Button
                onClick={() => handleSocialLogin('Apple')}
                disabled={isLoading}
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2"
              >
                <Apple color="#000000" size={20} />
                Apple
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Login form */}
          <div className="space-y-6">
            
            {/* Email field */}
            <div className="relative">
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10"
                required
                disabled={isLoading}
              />
              <Profile 
                color="#6B7280" 
                size={18}
                className="absolute left-3 top-9 text-gray-400"
              />
            </div>

            {/* Password field */}
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10 pr-12"
                required
                disabled={isLoading}
              />
              <Lock 
                color="#6B7280" 
                size={18}
                className="absolute left-3 top-9 text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeSlash color="#6B7280" size={18} />
                ) : (
                  <Eye color="#6B7280" size={18} />
                )}
              </button>
            </div>

            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                  disabled={isLoading}
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit button */}
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg'
              } text-white flex items-center justify-center gap-2`}
            >
              {isLoading ? (
                <>
                  <SpinLoader />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </div>

          {/* Sign up link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={handleSignUp}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                disabled={isLoading}
              >
                Sign up for free
              </button>
            </p>
          </div>

          {/* Terms and privacy */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <a href="/terms" className="text-blue-600 hover:text-blue-700 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-700 transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Help text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <button
              onClick={() => window.location.href = '/contact'}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Contact our support team
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;