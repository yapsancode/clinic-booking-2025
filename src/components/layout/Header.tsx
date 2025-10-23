"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActive = (path: string) => pathname === path;

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I'd like to book an appointment.");
    const phoneNumber = '601169999443';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-2xl border-b border-red-100'
          : 'bg-white shadow-lg border-b border-gray-100'
      }`}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-16 lg:h-18">
            {/* Enhanced Logo - Mobile Optimized */}
            <Link
              href="/"
              className="group flex items-center space-x-2 lg:space-x-3 hover:scale-105 transition-all duration-300"
            >
              <div className="relative">
                <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-red-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-base lg:text-xl font-bold bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                  Klinik Mekar
                </span>
                <div className="text-[10px] lg:text-xs text-gray-500 font-medium -mt-0.5">
                  Healthcare Excellence
                </div>
              </div>

              <div className="flex flex-col items-center justify-center bg-red-600 text-white rounded-lg px-1.5 py-0.5 lg:px-2 lg:py-1 leading-none shadow-md hover:scale-105 transition-transform duration-300">
                <span className="text-base lg:text-xl font-bold">24</span>
                <span className="text-[8px] lg:text-[10px] font-semibold tracking-wider">HOURS</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link
                href="/"
                className={`relative px-4 py-2 font-medium rounded-lg transition-all duration-300 group ${
                  isActive('/')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                Home
              </Link>

              <Link
                href="/doctors"
                className={`relative px-4 py-2 font-medium rounded-lg transition-all duration-300 group ${
                  isActive('/doctors')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                Doctors
              </Link>

              <Link
                href="/services"
                className={`relative px-4 py-2 font-medium rounded-lg transition-all duration-300 group ${
                  isActive('/services')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                Services
              </Link>

              <Link
                href="/about"
                className={`relative px-4 py-2 font-medium rounded-lg transition-all duration-300 group ${
                  isActive('/about')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                About
              </Link>

              <Link
                href="/contact"
                className={`relative px-4 py-2 font-medium rounded-lg transition-all duration-300 group ${
                  isActive('/contact')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 lg:space-x-3">
              {/* Emergency Call Button - Desktop */}
              <a
                href="tel:+601169999443"
                className="hidden lg:inline-flex items-center px-3 py-2 text-emerald-600 hover:text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-300 group"
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                <svg className="w-4 h-4 mr-1 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden xl:inline text-sm">Emergency</span>
              </a>

              {/* Book Now Button - Mobile & Desktop */}
              <button
                onClick={handleWhatsAppClick}
                className="hidden sm:inline-flex items-center px-4 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-red-600 via-pink-600 to-red-700 hover:from-red-700 hover:via-pink-700 hover:to-red-800 text-white text-sm lg:text-base font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-red-500/25 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="relative z-10">Book Now</span>
              </button>

              {/* Enhanced Mobile Menu Button */}
              <button
                className="lg:hidden relative flex items-center justify-center w-11 h-11 text-gray-700 hover:text-red-600 transition-all duration-300 rounded-xl hover:bg-red-50 active:scale-95 group touch-manipulation"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                <div className="relative w-6 h-5">
                  <span className={`absolute left-0 w-6 h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 top-2' : 'top-0'
                  }`}></span>
                  <span className={`absolute top-2 left-0 w-6 h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}></span>
                  <span className={`absolute left-0 w-6 h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 top-2' : 'top-4'
                  }`}></span>
                </div>
                
                {/* Active indicator */}
                {isOpen && (
                  <div className="absolute inset-0 rounded-xl bg-red-100 -z-10"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Navigation Overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Slide-in Menu */}
        <div className={`absolute top-16 left-0 right-0 bg-white shadow-2xl transition-all duration-300 ease-out ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}>
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="p-4 space-y-1">
              {/* Navigation Links */}
              <Link
                href="/"
                className={`flex items-center px-4 py-3.5 font-medium rounded-xl transition-all duration-200 active:scale-98 touch-manipulation ${
                  isActive('/')
                    ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-colors ${
                  isActive('/') ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <span className="text-base">Home</span>
                {isActive('/') && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-blue-600"></div>
                )}
              </Link>

              <a
                href="/doctors"
                className={`flex items-center px-4 py-3.5 font-medium rounded-xl transition-all duration-200 active:scale-98 touch-manipulation ${
                  isActive('/doctors')
                    ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-colors ${
                  isActive('/doctors') ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-base">Our Doctors</span>
                {isActive('/doctors') && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-blue-600"></div>
                )}
              </a>

              <a
                href="/services"
                className={`flex items-center px-4 py-3.5 font-medium rounded-xl transition-all duration-200 active:scale-98 touch-manipulation ${
                  isActive('/services')
                    ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-colors ${
                  isActive('/services') ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-base">Services</span>
                {isActive('/services') && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-blue-600"></div>
                )}
              </a>

              <a
                href="/about"
                className={`flex items-center px-4 py-3.5 font-medium rounded-xl transition-all duration-200 active:scale-98 touch-manipulation ${
                  isActive('/about')
                    ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-colors ${
                  isActive('/about') ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-base">About Us</span>
                {isActive('/about') && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-blue-600"></div>
                )}
              </a>

              <a
                href="/contact"
                className={`flex items-center px-4 py-3.5 font-medium rounded-xl transition-all duration-200 active:scale-98 touch-manipulation ${
                  isActive('/contact')
                    ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-colors ${
                  isActive('/contact') ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-base">Contact</span>
                {isActive('/contact') && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-blue-600"></div>
                )}
              </a>

              {/* Action Buttons Section */}
              <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
                {/* Emergency Call */}
                <a
                  href="tel:+601169999443"
                  className="flex items-center justify-center px-4 py-3.5 bg-gradient-to-r from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 text-emerald-700 font-semibold rounded-xl transition-all duration-300 shadow-sm active:scale-98 touch-manipulation group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-200 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span>Emergency Call</span>
                  <div className="ml-auto w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </a>

                {/* Book Appointment */}
                <button
                  onClick={() => {
                    handleWhatsAppClick();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center px-4 py-4 bg-gradient-to-r from-red-600 via-pink-600 to-red-700 hover:from-red-700 hover:via-pink-700 hover:to-red-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-98 touch-manipulation group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg className="w-6 h-6 mr-3 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="relative z-10 text-base">Book Appointment via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}