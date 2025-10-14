"use client";
import { useState } from "react";

interface PhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (phone: string) => void;
  userName: string;
}

export default function PhoneModal({ isOpen, onClose, onSubmit, userName }: PhoneModalProps) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!phone.match(/^[\+]?[1-9][\d]{0,15}$/)) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // await updateUserPhone(phone);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      onSubmit(phone);
    } catch (err) {
      setError('Failed to save phone number. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            One More Thing, {userName}!
          </h2>
          <p className="text-gray-600">
            We need your phone number for appointment reminders and confirmations
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError('');
            }}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
            placeholder="+60123456789"
          />
          <p className="text-sm text-gray-500 mt-2">
            Include country code (e.g., +60 for Malaysia)
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl px-6 py-3 transition-all duration-300"
            disabled={isLoading}
          >
            Skip for Now
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}