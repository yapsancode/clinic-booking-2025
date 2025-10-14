"use client";
import { useState } from "react";

type AuthUserData = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  authMethod: 'google' | 'email';
};

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: AuthUserData) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'choice' | 'login' | 'register'>('choice');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual Google OAuth
      // const result = await signIn('google');
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user data - replace with actual OAuth response
      onSuccess({
        id: 'user123',
        name: 'John Doe',
        email: 'john@gmail.com',
        phone: null, // Google doesn't provide phone
        authMethod: 'google'
      });
    } catch (err) {
      setError('Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    setError('');
    
    // Validation
    if (mode === 'register' && !name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const result = mode === 'login' 
      //   ? await signIn('credentials', { email, password })
      //   : await registerUser({ name, email, password });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSuccess({
        id: 'user456',
        name: mode === 'register' ? name : 'John Doe',
        email,
        phone: null,
        authMethod: 'email'
      });
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Choice Screen */}
        {mode === 'choice' && (
          <div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">One Last Step!</h2>
              <p className="text-gray-600">Please sign in or create an account to confirm your appointment</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 rounded-xl px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {isLoading ? 'Connecting...' : 'Continue with Google'}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>

              <button
                onClick={() => { setMode('login'); resetForm(); }}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300"
              >
                Sign In with Email
              </button>

              <button
                onClick={() => { setMode('register'); resetForm(); }}
                className="w-full border-2 border-teal-500 text-teal-500 hover:bg-teal-50 font-semibold rounded-xl px-6 py-3 transition-all duration-300"
              >
                Create New Account
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-6">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        )}

        {/* Login/Register Form */}
        {(mode === 'login' || mode === 'register') && (
          <div>
            <button
              onClick={() => { setMode('choice'); resetForm(); }}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
                    placeholder="John Doe"
                  />
                </div>
              )}

              <div>
                <label htmlFor="auth-email" className="block text-gray-700 font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="auth-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="auth-password" className="block text-gray-700 font-medium mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  id="auth-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
                  placeholder="••••••••"
                />
                {mode === 'register' && (
                  <p className="text-sm text-gray-500 mt-1">Minimum 8 characters</p>
                )}
              </div>

              {mode === 'login' && (
                <div className="text-right">
                  <button type="button" className="text-sm text-teal-500 hover:text-teal-600">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                onClick={handleEmailAuth}
                disabled={isLoading}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : (
                  mode === 'login' ? 'Sign In' : 'Create Account'
                )}
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); resetForm(); }}
                className="text-teal-500 hover:text-teal-600 font-medium"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}