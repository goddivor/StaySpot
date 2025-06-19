/* eslint-disable no-useless-escape */
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
  Profile,
  Call,
  Calendar,
  TickCircle,
  InfoCircle
} from 'iconsax-react';
import Button from '@/components/Button';
import Logo from '@/components/ui/logo';
import { Input } from '@/components/Input';
import SpinLoader from '@/components/SpinLoader';
import { useToast } from '@/context/toast-context';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}

const Register: React.FC = () => {
  const { success, error } = useToast();
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Domain modeling: User registration is a multi-step process that requires validation at each stage
  // Think of it like checking into a hotel - you provide basic info first, then additional details
  const totalSteps = 2;

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof FormErrors];
        return newErrors;
      });
    }

    // Calculate password strength in real-time
    if (field === 'password' && typeof value === 'string') {
      calculatePasswordStrength(value);
    }
  };

  // Password strength calculator - like a security meter at hotel registration
  const calculatePasswordStrength = (password: string): void => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
    
    setPasswordStrength(strength);
  };

  const getPasswordStrengthLabel = (strength: number): string => {
    switch (strength) {
      case 0:
      case 1: return 'Very Weak';
      case 2: return 'Weak';
      case 3: return 'Fair';
      case 4: return 'Good';
      case 5: return 'Strong';
      default: return 'Very Weak';
    }
  };

  const getPasswordStrengthColor = (strength: number): string => {
    switch (strength) {
      case 0:
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-blue-500';
      case 5: return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  // Form validation - like verifying guest information before room assignment
  const validateStep = (step: number): boolean => {
    const errors: FormErrors = {};

    if (step === 1) {
      // Basic information validation
      if (!formData.firstName.trim()) {
        errors.firstName = 'First name is required';
      }
      
      if (!formData.lastName.trim()) {
        errors.lastName = 'Last name is required';
      }
      
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
      
      if (!formData.phone.trim()) {
        errors.phone = 'Phone number is required';
      } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
        errors.phone = 'Please enter a valid phone number';
      }
      
      if (!formData.dateOfBirth) {
        errors.dateOfBirth = 'Date of birth is required';
      } else {
        // Check if user is at least 18 years old
        const birthDate = new Date(formData.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        if (age < 18) {
          errors.dateOfBirth = 'You must be at least 18 years old to register';
        }
      }
    }

    if (step === 2) {
      // Security and terms validation
      if (!formData.password) {
        errors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
      } else if (passwordStrength < 3) {
        errors.password = 'Please choose a stronger password';
      }
      
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      
      if (!formData.agreeToTerms) {
        errors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(2)) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call - like processing hotel reservation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      success(
        'Account Created Successfully!', 
        'Welcome to StaySpot! Please check your email to verify your account.'
      );
      
      // Redirect to login or dashboard
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      
    } catch (err) {
      error('Registration Failed', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    setIsLoading(true);
    success(`${provider} Signup`, `Redirecting to ${provider} authentication...`);
    
    // Simulate social signup redirect
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      handlePrevStep();
    } else {
      window.history.back();
    }
  };

  const handleSignIn = () => {
    window.location.href = '/login';
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <React.Fragment key={stepNumber}>
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${isCompleted 
                  ? 'bg-green-500 text-white' 
                  : isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {isCompleted ? (
                  <TickCircle color="white" size={16} />
                ) : (
                  stepNumber
                )}
              </div>
              
              {stepNumber < totalSteps && (
                <div className={`
                  w-12 h-1 mx-2
                  ${stepNumber < currentStep ? 'bg-green-500' : 'bg-gray-200'}
                `} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Let's get to know you better</p>
      </div>

      {/* Name fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="pl-10"
            error={formErrors.firstName}
            disabled={isLoading}
          />
          <Profile 
            color="#6B7280" 
            size={18}
            className="absolute left-3 top-9 text-gray-400"
          />
        </div>

        <div className="relative">
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="pl-10"
            error={formErrors.lastName}
            disabled={isLoading}
          />
          <Profile 
            color="#6B7280" 
            size={18}
            className="absolute left-3 top-9 text-gray-400"
          />
        </div>
      </div>

      {/* Email field */}
      <div className="relative">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="pl-10"
          error={formErrors.email}
          disabled={isLoading}
        />
        <Profile 
          color="#6B7280" 
          size={18}
          className="absolute left-3 top-9 text-gray-400"
        />
      </div>

      {/* Phone field */}
      <div className="relative">
        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="pl-10"
          error={formErrors.phone}
          disabled={isLoading}
        />
        <Call 
          color="#6B7280" 
          size={18}
          className="absolute left-3 top-9 text-gray-400"
        />
      </div>

      {/* Date of birth */}
      <div className="relative">
        <Input
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          className="pl-10"
          error={formErrors.dateOfBirth}
          disabled={isLoading}
        />
        <Calendar 
          color="#6B7280" 
          size={18}
          className="absolute left-3 top-9 text-gray-400"
        />
      </div>

      {/* Continue button */}
      <Button
        onClick={handleNextStep}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
      >
        Continue to Security
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Password</h2>
        <p className="text-gray-600">Secure your account with a strong password</p>
      </div>

      {/* Password field */}
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a strong password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          className="pl-10 pr-12"
          error={formErrors.password}
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
        
        {/* Password strength indicator */}
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                />
              </div>
              <span className={`text-xs font-medium ${
                passwordStrength < 3 ? 'text-red-600' : passwordStrength < 4 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {getPasswordStrengthLabel(passwordStrength)}
              </span>
            </div>
            <div className="text-xs text-gray-600">
              <p>Password should contain:</p>
              <ul className="ml-4 mt-1 space-y-1">
                <li className={formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}>
                  • At least 8 characters
                </li>
                <li className={/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                  • Lowercase letters
                </li>
                <li className={/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                  • Uppercase letters
                </li>
                <li className={/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                  • Numbers
                </li>
                <li className={/[^a-zA-Z0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                  • Special characters
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Confirm password field */}
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          className="pl-10 pr-12"
          error={formErrors.confirmPassword}
          disabled={isLoading}
        />
        <Lock 
          color="#6B7280" 
          size={18}
          className="absolute left-3 top-9 text-gray-400"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={isLoading}
        >
          {showConfirmPassword ? (
            <EyeSlash color="#6B7280" size={18} />
          ) : (
            <Eye color="#6B7280" size={18} />
          )}
        </button>
      </div>

      {/* Terms and conditions */}
      <div className="space-y-4">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300 mt-1"
            disabled={isLoading}
          />
          <div className="ml-3">
            <span className="text-sm text-gray-700">
              I agree to the{' '}
              <a href="/terms" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Privacy Policy
              </a>
            </span>
            {formErrors.agreeToTerms && (
              <p className="text-red-500 text-xs mt-1">{formErrors.agreeToTerms}</p>
            )}
          </div>
        </label>

        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            checked={formData.subscribeNewsletter}
            onChange={(e) => handleInputChange('subscribeNewsletter', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300 mt-1"
            disabled={isLoading}
          />
          <span className="ml-3 text-sm text-gray-700">
            I want to receive travel tips, special offers, and updates via email
          </span>
        </label>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handlePrevStep}
          disabled={isLoading}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-all duration-300"
        >
          Back
        </Button>
        
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`flex-2 py-3 rounded-lg font-semibold transition-all duration-300 ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg'
          } text-white flex items-center justify-center gap-2`}
        >
          {isLoading ? (
            <>
              <SpinLoader />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-200/40 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 bg-indigo-200/35 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-300/25 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Main register container */}
      <div className="w-full max-w-md relative">
        
        {/* Back button */}
        <Button
          onClick={handleBack}
          className="absolute -top-16 left-0 p-2 hover:bg-white/80 rounded-lg transition-colors backdrop-blur-sm flex items-center gap-2"
        >
          <ArrowLeft color="#374151" size={20} />
          <span className="text-gray-700 text-sm">
            {currentStep > 1 ? 'Previous Step' : 'Back'}
          </span>
        </Button>

        {/* Register card */}
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join StaySpot</h1>
            <p className="text-gray-600">Create your account to start your journey</p>
          </div>

          {/* Step indicator */}
          {renderStepIndicator()}

          {/* Social signup buttons - only show on step 1 */}
          {currentStep === 1 && (
            <>
              <div className="space-y-3 mb-8">
                <Button
                  onClick={() => handleSocialSignup('Google')}
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md flex items-center justify-center gap-3"
                >
                  <Google color="#EA4335" size={20} />
                  Sign up with Google
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleSocialSignup('Facebook')}
                    disabled={isLoading}
                    className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <Facebook color="#1877F2" size={20} />
                    Facebook
                  </Button>
                  
                  <Button
                    onClick={() => handleSocialSignup('Apple')}
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
                  <span className="px-4 bg-white text-gray-500">Or sign up with email</span>
                </div>
              </div>
            </>
          )}

          {/* Registration form steps */}
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
          </form>

          {/* Sign in link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={handleSignIn}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                disabled={isLoading}
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>

        {/* Security notice */}
        <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <InfoCircle color="#6B7280" size={16} />
            <span>Your information is secure and encrypted</span>
          </div>
        </div>

        {/* Help text */}
        <div className="text-center mt-4">
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

export default Register;