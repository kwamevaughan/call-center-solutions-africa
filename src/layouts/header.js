"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { menuItems } from "../data/menuData";
import { useFixedHeader, handleScroll } from "../../utils/scrollUtils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isFixed = useFixedHeader();

  return (
    <nav
      className={`flex items-center justify-center w-full z-50 transition-all duration-300 ${
        isFixed
          ? "fixed top-0 left-0 mt-4"
          : "absolute top-0 left-0 bg-transparent mt-4" // Conditional margin-top based on isFixed
      }`}
    >
      <div className="w-full px-4">
        <div
          className={`max-w-6xl rounded-xl mx-auto w-full py-2 px-4 flex items-center justify-between ${
            isFixed ? "bg-white/75 shadow-lg backdrop-blur-md" : "bg-white"
          }`}
        >
          {/* Logo - Centered */}
          <div className="flex-shrink-0">
            <Link href="/" passHref>
              <Image
                src="/assets/images/logo.svg"
                alt="Logo"
                width={200}
                height={70}
                className="rounded-xl"
              />
            </Link>
          </div>

          {/* Hamburger Menu Button (mobile only) */}
          <div className="flex items-center md:hidden absolute right-4 z-60">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-950 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
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
          </div>

          {/* Desktop Menu and CTA (hidden on mobile) */}
          <div className="hidden md:flex w-full justify-end">
            <div className="flex space-x-2 justify-end">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href, isFixed)}
                  className="text-gray-950 hover:text-gray-900 hover:bg-[#ED761E] px-4 py-2 rounded-full transition-all duration-300 cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (shown when hamburger is clicked) */}
      <div
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"} w-full absolute top-[70px] left-0 bg-white/95`}
        style={{ zIndex: 50 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                handleScroll(e, item.href, isFixed);
                setIsMenuOpen(false);
              }}
              className="text-gray-950 hover:text-gray-900 hover:bg-[#ED761E] block px-4 py-2 rounded-full transition-all duration-300 cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
