'use client';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';

interface WhatsAppButtonProps {
    message?: string;
    label?: string;
    className?: string;
    showIcon?: boolean;
    iconColor?: string;
    showArrow?: boolean;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
    message = "Hello! I'd like to book an appointment.",
    label = 'Book via WhatsApp',
    className = '',
    showIcon = true,
    iconColor = 'text-green-600',
    showArrow = false,
}) => {
    const phoneNumber = '601169999443'; // your clinic number
    const handleClick = () => {
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappLink, '_blank');
    };
    return (
        <button
            onClick={handleClick}
            className={`relative group inline-flex items-center justify-center transition-all duration-300 font-semibold rounded-lg shadow-lg cursor-pointer ${className}`}
        >
            {/* Hover glow layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-100/50 to-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
            
            {/* WhatsApp icon */}
            {showIcon && (
                <FaWhatsapp
                    className={`w-6 h-6 mr-3 ${iconColor} relative z-10 transition-transform duration-300 group-hover:rotate-12`}
                />
            )}
            
            {/* Label */}
            <span className="relative z-10">{label}</span>
            
            {/* Optional arrow */}
            {showArrow && (
                <HiArrowNarrowRight className="w-5 h-5 ml-3 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            )}
            
            {/* Hover ring animation */}
            <div className="absolute inset-0 rounded-lg ring-4 ring-white/50 scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none"></div>
        </button>
    );
};

export default WhatsAppButton;
