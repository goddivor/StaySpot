/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Profile,
  Lock,
  Eye,
  EyeSlash,
  DirectboxNotif,
  TickCircle,
  InfoCircle,
  Clock,
  ShieldTick
} from 'iconsax-react';
import Button from '@/components/Button';
import Logo from '@/components/ui/logo';
import { Input } from '@/components/Input';
import SpinLoader from '@/components/SpinLoader';
import { useToast } from '@/context/toast-context';

interface FormData {
  email: string;
  resetCode: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  resetCode?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const PasswordReset: React.FC = () => {
  const { success, error, info } = useToast();
  
  // Form state - think of this like a hotel key card replacement process
  // Step 1: Verify identity (email), Step 2: Verify ownership (code), Step 3: Create new key (password)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    resetCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: Code, 3: New Password
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [codeExpiryTime, setCodeExpiryTime] = useState(0);

  // Domain modeling: Password reset is like getting a replacement hotel key
  // 1. Prove you're the rightful guest (email verification)
  // 2. Verify you have access to your contact info (code verification) 
  // 3. Create your new key (set new password)
  const totalSteps = 3;

  // Countdown timer for resend cooldown - like waiting between key card attempts
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Code expiry timer - security measure like temporary hotel key cards
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (codeExpiryTime > 0) {
      interval = setInterval(() => {
        setCodeExpiryTime(prev => {
          if (prev <= 1) {
            error('Code Expired', 'Your reset code has expired. Please request a new one.');
            setCurrentStep(1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [codeExpiryTime, error]);

  const handleInputChange = (field: keyof FormData, value: string) => {
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
    if (field === 'newPassword') {
      calculatePasswordStrength(value);
    }
  };

  // Password strength calculator - like a security meter for hotel safe codes
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

  // Form validation - like verifying guest credentials at each step
  const validateStep = (step: number): boolean => {
    const errors: FormErrors = {};

    if (step === 1) {
      // Email validation - verify guest identity
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    if (step === 2) {
      // Reset code validation - verify access to contact method
      if (!formData.resetCode.trim()) {
        errors.resetCode = 'Reset code is required';
      } else if (formData.resetCode.length !== 6) {
        errors.resetCode = 'Reset code must be 6 digits';
      } else if (!/^\d{6}$/.test(formData.resetCode)) {
        errors.resetCode = 'Reset code must contain only numbers';
      }
    }

    if (step === 3) {
      // Password validation - create secure new credentials
      if (!formData.newPassword) {
        errors.newPassword = 'New password is required';
      } else if (formData.newPassword.length < 8) {
        errors.newPassword = 'Password must be at least 8 characters long';
      } else if (passwordStrength < 3) {
        errors.newPassword = 'Please choose a stronger password';
      }
      
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.newPassword !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Send reset email - like requesting a replacement key card
  const handleSendResetEmail = async () => {
    if (!validateStep(1)) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      success(
        'Reset Code Sent!', 
        `We've sent a 6-digit code to ${formData.email}. Please check your email and spam folder.`
      );
      
      setCurrentStep(2);
      setCodeExpiryTime(600); // 10 minutes
      setResendCooldown(60); // 1 minute cooldown
      
    } catch (err) {
      error('Failed to Send Code', 'Please check your email address and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Verify reset code - like validating the temporary access card
  const handleVerifyCode = async () => {
    if (!validateStep(2)) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call for code verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock code validation (in real app, this would be server-side)
      if (formData.resetCode === '123456') {
        success('Code Verified!', 'Your identity has been confirmed. Please set your new password.');
        setCurrentStep(3);
      } else {
        error('Invalid Code', 'The code you entered is incorrect. Please try again.');
      }
      
    } catch (err) {
      error('Verification Failed', 'Unable to verify the code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password - like programming a new key card
  const handleResetPassword = async () => {
    if (!validateStep(3)) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      success(
        'Password Reset Successfully!', 
        'Your password has been updated. You can now sign in with your new password.'
      );
      
      // Redirect to login after success
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      
    } catch (err) {
      error('Reset Failed', 'Unable to reset your password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend code - like requesting another temporary access card
  const handleResendCode = async () => {
    if (resendCooldown > 0) {
      info('Please Wait', `You can request a new code in ${resendCooldown} seconds.`);
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      success('New Code Sent!', 'A new reset code has been sent to your email.');
      setCodeExpiryTime(600); // Reset timer
      setResendCooldown(60); // Reset cooldown
      
    } catch (err) {
      error('Failed to Resend', 'Unable to send a new code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      window.location.href = '/login';
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleSignIn = () => {
    window.location.href = '/login';
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock color="#3B82F6" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
        <p className="text-gray-600">
          Enter your email address and we'll send you a code to reset your password.
        </p>
      </div>

      {/* Email field */}
      <div className="relative">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
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

      {/* Send code button */}
      <Button
        onClick={handleSendResetEmail}
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
            Sending Code...
          </>
        ) : (
          <>
            <DirectboxNotif color="white" size={20} />
            Send Reset Code
          </>
        )}
      </Button>

      {/* Back to login */}
      <div className="text-center">
        <button
          onClick={handleSignIn}
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
          disabled={isLoading}
        >
          <ArrowLeft color="#2563EB" size={16} />
          Back to Sign In
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <DirectboxNotif color="#059669" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
        <p className="text-gray-600 mb-4">
          We've sent a 6-digit code to
          <br />
          <span className="font-medium text-gray-900">{formData.email}</span>
        </p>
        
        {/* Timer display */}
        {codeExpiryTime > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-center gap-2 text-yellow-800">
              <Clock color="#F59E0B" size={16} />
              <span className="text-sm font-medium">
                Code expires in {formatTime(codeExpiryTime)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Reset code field */}
      <div className="relative">
        <Input
          label="Reset Code"
          type="text"
          placeholder="Enter 6-digit code"
          value={formData.resetCode}
          onChange={(e) => {
            // Only allow numbers and limit to 6 digits
            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
            handleInputChange('resetCode', value);
          }}
          className="text-center text-2xl font-bold tracking-wider"
          error={formErrors.resetCode}
          disabled={isLoading}
          maxLength={6}
        />
      </div>

      {/* Verify button */}
      <Button
        onClick={handleVerifyCode}
        disabled={isLoading || formData.resetCode.length !== 6}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
          isLoading || formData.resetCode.length !== 6
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg'
        } text-white flex items-center justify-center gap-2`}
      >
        {isLoading ? (
          <>
            <SpinLoader />
            Verifying...
          </>
        ) : (
          <>
            <ShieldTick color="white" size={20} />
            Verify Code
          </>
        )}
      </Button>

      {/* Resend code */}
      <div className="text-center space-y-2">
        <p className="text-gray-600 text-sm">Didn't receive the code?</p>
        <button
          onClick={handleResendCode}
          disabled={isLoading || resendCooldown > 0}
          className={`font-medium transition-colors ${
            isLoading || resendCooldown > 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          {resendCooldown > 0 
            ? `Resend in ${resendCooldown}s` 
            : 'Resend Code'
          }
        </button>
      </div>

      {/* Change email */}
      <div className="text-center">
        <button
          onClick={() => setCurrentStep(1)}
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
          disabled={isLoading}
        >
          Use a different email address
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock color="#059669" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Password</h2>
        <p className="text-gray-600">
          Your identity has been verified. Please set a strong new password.
        </p>
      </div>

      {/* New password field */}
      <div className="relative">
        <Input
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a strong password"
          value={formData.newPassword}
          onChange={(e) => handleInputChange('newPassword', e.target.value)}
          className="pl-10 pr-12"
          error={formErrors.newPassword}
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
        {formData.newPassword && (
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
          </div>
        )}
      </div>

      {/* Confirm password field */}
      <div className="relative">
        <Input
          label="Confirm New Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm your new password"
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

      {/* Reset password button */}
      <Button
        onClick={handleResetPassword}
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
            Updating Password...
          </>
        ) : (
          <>
            <TickCircle color="white" size={20} />
            Update Password
          </>
        )}
      </Button>
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

      {/* Main container */}
      <div className="w-full max-w-md relative">
        
        {/* Back button */}
        <Button
          onClick={handleBack}
          className="absolute -top-16 left-0 p-2 hover:bg-white/80 rounded-lg transition-colors backdrop-blur-sm flex items-center gap-2"
        >
          <ArrowLeft color="#374151" size={20} />
          <span className="text-gray-700 text-sm">
            {currentStep > 1 ? 'Previous Step' : 'Back to Login'}
          </span>
        </Button>

        {/* Reset card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-white/20">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div 
              className="flex justify-center mb-6 cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={handleGoHome}
            >
              <Logo size={64} />
            </div>
          </div>

          {/* Step indicator */}
          {renderStepIndicator()}

          {/* Form content based on current step */}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Security notice */}
          {currentStep === 1 && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <InfoCircle color="#3B82F6" size={20} className="flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Security Notice</p>
                  <p>For your protection, reset codes expire after 10 minutes and can only be used once.</p>
                </div>
              </div>
            </div>
          )}
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

export default PasswordReset;