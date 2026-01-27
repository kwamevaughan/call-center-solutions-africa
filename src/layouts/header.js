"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { menuItems } from "../data/menuData";
import { handleScroll } from "../../utils/scrollUtils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const router = useRouter();

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <nav className="sticky top-0 left-0 right-0 w-full z-50 bg-ccsa-dark-blue shadow-lg">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="w-full py-2 sm:py-3 md:py-4 flex items-center justify-between gap-2">
          {/* Logo - Mobile First */}
          <div className="flex-shrink-0 min-w-0">
            <Link href="/" passHref className="block">
              <Image
                src="https://ik.imagekit.io/nkmvdjnna/CCSA/primary-logo.svg"
                alt="Logo"
                width={120}
                height={42}
                className="w-[100px] h-auto sm:w-[130px] md:w-[160px] lg:w-[180px] xl:w-[200px] rounded-xl transition-all duration-300"
                priority
                loading="eager"
              />
            </Link>
          </div>

          {/* Hamburger Menu Button (mobile first, hidden on desktop) */}
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              if (isMenuOpen) setIsSolutionsOpen(false);
            }}
            className="md:hidden p-2 rounded-md focus:outline-none z-[60] flex-shrink-0"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Menu (hidden on mobile, shown on md+) */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 xl:gap-3 relative flex-1 justify-center min-w-0">
            {menuItems.map((item) => {
              const isActive = router.pathname === item.href || router.asPath === item.href;
              const activeClasses = isActive 
                ? "text-ccsa-orange border-b-2 border-ccsa-orange pb-1" 
                : "text-white hover:text-white/90 hover:bg-[#ED761E]";
              
              // Solutions dropdown
              if (item.hasDropdown && item.submenu) {
                const handleMouseEnter = () => {
                  // Clear any pending timeout
                  if (dropdownTimeoutRef.current) {
                    clearTimeout(dropdownTimeoutRef.current);
                    dropdownTimeoutRef.current = null;
                  }
                  setIsSolutionsOpen(true);
                };

                const handleMouseLeave = () => {
                  // Add a delay before closing to allow user to navigate to dropdown
                  dropdownTimeoutRef.current = setTimeout(() => {
                    setIsSolutionsOpen(false);
                  }, 200); // 200ms delay
                };

                return (
                  <div 
                    key={item.href}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className={`${activeClasses} px-2 md:px-3 lg:px-4 py-2 rounded-full transition-all duration-300 cursor-pointer text-xs md:text-sm lg:text-base flex items-center gap-1`}>
                      <Link href={item.href} className="hover:text-inherit whitespace-nowrap">
                        {item.label}
                      </Link>
                      <button
                        onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                        className="flex items-center justify-center flex-shrink-0"
                        aria-label="Toggle solutions menu"
                      >
                        <Icon 
                          icon={isSolutionsOpen ? "mdi:minus" : "mdi:plus"} 
                          width={16} 
                          height={16} 
                          className="md:w-[18px] md:h-[18px] transition-transform duration-300"
                        />
                      </button>
                    </div>
                    {isSolutionsOpen && (
                      <div 
                        className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl py-2 min-w-[280px] md:min-w-[320px] lg:min-w-[380px] max-w-[90vw] z-50 border border-gray-200"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-3 md:px-4 py-2 text-gray-800 hover:text-ccsa-orange hover:bg-gray-50 transition-all duration-300 text-xs md:text-sm break-words"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              
              // Regular menu items
              return item.isAnchor ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href, true)}
                  className={`${activeClasses} px-2 md:px-3 lg:px-4 py-2 rounded-full transition-all duration-300 cursor-pointer text-xs md:text-sm lg:text-base whitespace-nowrap`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${activeClasses} px-2 md:px-3 lg:px-4 py-2 rounded-full transition-all duration-300 cursor-pointer text-xs md:text-sm lg:text-base whitespace-nowrap`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Button (hidden on mobile, shown on md+) */}
          <Link
            href="/contact-us"
            className="hidden md:flex text-white px-3 md:px-4 py-2 rounded-full font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap items-center gap-1 md:gap-2 hover:opacity-90 text-xs md:text-sm flex-shrink-0"
            style={{
              background: "var(--ccsa-gradient)"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="m6.527 10.782l-.001-.003l-.19-.062a5 5 0 0 1-2.284-1.649a5 5 0 1 1 8.924-3.567c.027.275-.2.499-.476.499s-.497-.225-.53-.499a4 4 0 1 0-5.285 4.278a1.5 1.5 0 1 1-.158 1.003m-.793.775a6 6 0 0 1-2.482-1.889A1.5 1.5 0 0 0 3 10.5v.5c0 1.971 1.86 4 5 4s5-2.029 5-4v-.5A1.5 1.5 0 0 0 11.5 9H10a2.5 2.5 0 1 1-4.266 2.557M11 6c0-.914-.409-1.733-1.054-2.283a3 3 0 1 0-3.518 4.84A2.5 2.5 0 0 1 8 7.999a2.5 2.5 0 0 1 1.572.556A3 3 0 0 0 11 6"/>
            </svg>
            <span>Free Consultation</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu (shown when hamburger is clicked) */}
      <div
        className={`md:hidden fixed inset-x-0 top-[73px] sm:top-[77px] bottom-0 bg-ccsa-dark-blue border-t border-white/10 overflow-y-auto transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"
        }`}
        style={{ zIndex: 50 }}
      >
        <div className="px-3 sm:px-4 py-4 space-y-2 max-h-full">
          {menuItems.map((item) => {
            const isActive = router.pathname === item.href || router.asPath === item.href;
            const activeClasses = isActive 
              ? "text-ccsa-orange border-b-2 border-ccsa-orange pb-1" 
              : "text-white hover:text-white/90 hover:bg-[#ED761E]";
            
            // Solutions dropdown for mobile
            if (item.hasDropdown && item.submenu) {
              return (
                <div key={item.href} className="w-full">
                  <div 
                    className={`${activeClasses} flex items-center justify-between px-3 sm:px-4 py-2.5 rounded-lg transition-all duration-300 cursor-pointer text-sm sm:text-base w-full`}
                    onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                  >
                    <Link href={item.href} onClick={(e) => e.stopPropagation()} className="flex-1 min-w-0">
                      <span className="truncate block">{item.label}</span>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSolutionsOpen(!isSolutionsOpen);
                      }}
                      className="flex items-center justify-center flex-shrink-0 ml-2"
                      aria-label="Toggle solutions menu"
                    >
                      <Icon 
                        icon={isSolutionsOpen ? "mdi:minus" : "mdi:plus"} 
                        width={20} 
                        height={20} 
                        className="transition-transform duration-300"
                      />
                    </button>
                  </div>
                  {isSolutionsOpen && (
                    <div className="ml-2 sm:ml-4 mt-2 space-y-1 border-l-2 border-ccsa-orange/30 pl-3 sm:pl-4 bg-white/10 backdrop-blur-sm rounded-lg py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsSolutionsOpen(false);
                          }}
                          className="block px-3 sm:px-4 py-2 text-white hover:text-ccsa-orange hover:bg-white/10 rounded-lg transition-all duration-300 text-xs sm:text-sm break-words"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            
            // Regular menu items
            return item.isAnchor ? (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  handleScroll(e, item.href, true);
                  setIsMenuOpen(false);
                }}
                className={`${activeClasses} block px-3 sm:px-4 py-2.5 rounded-lg transition-all duration-300 cursor-pointer text-sm sm:text-base w-full`}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`${activeClasses} block px-3 sm:px-4 py-2.5 rounded-lg transition-all duration-300 cursor-pointer text-sm sm:text-base w-full`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact-us"
            onClick={() => setIsMenuOpen(false)}
            className="text-white px-4 sm:px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 cursor-pointer block text-center flex items-center justify-center gap-2 hover:opacity-90 mt-4 text-sm sm:text-base"
            style={{
              background: "var(--ccsa-gradient)"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
              <path d="m6.527 10.782l-.001-.003l-.19-.062a5 5 0 0 1-2.284-1.649a5 5 0 1 1 8.924-3.567c.027.275-.2.499-.476.499s-.497-.225-.53-.499a4 4 0 1 0-5.285 4.278a1.5 1.5 0 1 1-.158 1.003m-.793.775a6 6 0 0 1-2.482-1.889A1.5 1.5 0 0 0 3 10.5v.5c0 1.971 1.86 4 5 4s5-2.029 5-4v-.5A1.5 1.5 0 0 0 11.5 9H10a2.5 2.5 0 1 1-4.266 2.557M11 6c0-.914-.409-1.733-1.054-2.283a3 3 0 1 0-3.518 4.84A2.5 2.5 0 0 1 8 7.999a2.5 2.5 0 0 1 1.572.556A3 3 0 0 0 11 6"/>
            </svg>
            Free Consultation
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
