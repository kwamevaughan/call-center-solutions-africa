"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

const FloatingCTA = ({ phoneNumber, whatsappNumber }) => {
  // Default phone numbers if not provided
  const defaultPhone = phoneNumber || "+254701850850";
  const defaultWhatsApp = whatsappNumber || "+254701850850";

  return (
    <>
      {/* Call CTA - Bottom Left */}
      <Link
        href={`tel:${defaultPhone}`}
        className="fixed bottom-6 left-6 z-50 group"
        aria-label="Call us"
      >
        <div className="relative w-12 h-12 sm:w-14 sm:h-14">
          {/* Pulsing ring animations */}
          <div className="absolute inset-0 rounded-full bg-ccsa-blue animate-ping opacity-20" style={{ animationDuration: '2s' }}></div>
          <div className="absolute inset-0 rounded-full bg-ccsa-blue animate-ping opacity-30" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 rounded-full bg-ccsa-blue/50 animate-pulse"></div>
          
          {/* Icon button */}
          <div className="relative w-full h-full bg-ccsa-blue rounded-full flex items-center justify-center shadow-2xl hover:shadow-ccsa-blue/50 transform hover:scale-110 active:scale-95 transition-all duration-300">
            <Icon 
              icon="mdi:phone" 
              className="w-6 h-6 sm:w-7 sm:h-7 text-white" 
            />
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-ccsa-dark-blue text-white text-xs sm:text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-xl">
              Call Us Now
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-ccsa-dark-blue"></div>
            </div>
          </div>
        </div>
      </Link>

      {/* WhatsApp CTA - Bottom Right */}
      <Link
        href={`https://wa.me/${defaultWhatsApp.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="WhatsApp us"
      >
        <div className="relative w-12 h-12 sm:w-14 sm:h-14">
          {/* Pulsing ring animations */}
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" style={{ animationDuration: '2s' }}></div>
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 rounded-full bg-[#25D366]/50 animate-pulse"></div>
          
          {/* Icon button */}
          <div className="relative w-full h-full bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:shadow-[#25D366]/50 transform hover:scale-110 active:scale-95 transition-all duration-300">
            <Icon 
              icon="mdi:whatsapp" 
              className="w-6 h-6 sm:w-7 sm:h-7 text-white" 
            />
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-1/2 transform translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-ccsa-dark-blue text-white text-xs sm:text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-xl">
              WhatsApp Us
              <div className="absolute top-full right-1/2 transform translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-ccsa-dark-blue"></div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default FloatingCTA;

