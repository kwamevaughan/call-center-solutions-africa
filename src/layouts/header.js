"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { menuItems } from "../data/menuData";
import { handleScroll } from "../../utils/scrollUtils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="sticky top-0 left-0 right-0 w-full z-50 bg-ccsa-dark-blue shadow-lg">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="w-full py-3 sm:py-4 flex items-center justify-between">
          {/* Logo - Mobile First */}
          <div className="flex-shrink-0">
            <Link href="/" passHref>
              <Image
                src="https://ik.imagekit.io/nkmvdjnna/CCSA/primary-logo.svg"
                alt="Logo"
                width={120}
                height={42}
                className="sm:w-[150px] sm:h-[52px] md:w-[180px] md:h-[63px] lg:w-[200px] lg:h-[70px] rounded-xl transition-all duration-300"
              />
            </Link>
          </div>

          {/* Hamburger Menu Button (mobile first, hidden on desktop) */}
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              if (isMenuOpen) setIsSolutionsOpen(false);
            }}
            className="md:hidden p-2 rounded-md focus:outline-none z-60"
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
          <div className="hidden md:flex items-center gap-2 lg:gap-3 relative flex-1 justify-center">
            {menuItems.map((item) => {
              const isActive = router.pathname === item.href || router.asPath === item.href;
              const activeClasses = isActive 
                ? "text-ccsa-orange border-b-2 border-ccsa-orange pb-1" 
                : "text-white hover:text-white/90 hover:bg-[#ED761E]";
              
              // Solutions dropdown
              if (item.hasDropdown && item.submenu) {
                return (
                  <div 
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setIsSolutionsOpen(true)}
                    onMouseLeave={() => setIsSolutionsOpen(false)}
                  >
                    <div className={`${activeClasses} px-3 lg:px-4 py-2 rounded-full transition-all duration-300 cursor-pointer text-sm lg:text-base flex items-center gap-1`}>
                      <Link href={item.href} className="hover:text-inherit">
                        {item.label}
                      </Link>
                      <button
                        onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                        className="flex items-center justify-center"
                        aria-label="Toggle solutions menu"
                      >
                        <Icon 
                          icon={isSolutionsOpen ? "mdi:minus" : "mdi:plus"} 
                          width={18} 
                          height={18} 
                          className="transition-transform duration-300"
                        />
                      </button>
                    </div>
                    {isSolutionsOpen && (
                      <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl py-2 min-w-[380px] z-50 border border-gray-200">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-2 text-gray-800 hover:text-ccsa-orange hover:bg-gray-50 transition-all duration-300 text-sm whitespace-nowrap"
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
                  className={`${activeClasses} px-3 lg:px-4 py-2 rounded-full transition-all duration-300 cursor-pointer text-sm lg:text-base`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${activeClasses} px-3 lg:px-4 py-2 rounded-full transition-all duration-300 cursor-pointer text-sm lg:text-base`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Button (hidden on mobile, shown on md+) */}
          <Link
            href="/contact-us"
            className="hidden md:flex text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap items-center gap-2 hover:opacity-90 text-sm flex-shrink-0"
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
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"} w-full bg-ccsa-dark-blue border-t border-white/10`}
        style={{ zIndex: 50 }}
      >
        <div className="px-3 py-3 space-y-2">
          {menuItems.map((item) => {
            const isActive = router.pathname === item.href || router.asPath === item.href;
            const activeClasses = isActive 
              ? "text-ccsa-orange border-b-2 border-ccsa-orange pb-1" 
              : "text-white hover:text-white/90 hover:bg-[#ED761E]";
            
            // Solutions dropdown for mobile
            if (item.hasDropdown && item.submenu) {
              return (
                <div key={item.href}>
                  <div 
                    className={`${activeClasses} flex items-center justify-between px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer text-base`}
                    onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                  >
                    <Link href={item.href} onClick={(e) => e.stopPropagation()}>
                      {item.label}
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSolutionsOpen(!isSolutionsOpen);
                      }}
                      className="flex items-center justify-center"
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
                    <div className="ml-4 mt-2 space-y-1 border-l-2 border-ccsa-orange/30 pl-4 bg-white rounded-lg py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsSolutionsOpen(false);
                          }}
                          className="block px-4 py-2 text-gray-800 hover:text-ccsa-orange hover:bg-gray-50 rounded-full transition-all duration-300 text-sm whitespace-nowrap"
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
                className={`${activeClasses} block px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer text-base`}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`${activeClasses} block px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer text-base`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact-us"
            onClick={() => setIsMenuOpen(false)}
            className="text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 cursor-pointer block text-center flex items-center justify-center gap-2 hover:opacity-90 mt-2"
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
