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
      className={`flex items-end justify-end w-full z-50 transition-all duration-500 ease-in-out ${
        isFixed
          ? "fixed top-0 left-0 mt-0 opacity-100 translate-y-0"
          : "absolute top-0 left-0 mt-4 opacity-100 translate-y-0"
      }`}
    >
      <div className="w-full px-2">
        <div
          className={`max-w-7xl rounded-xl mx-auto w-full py-2 px-4 flex items-center justify-between transition-all duration-500 ease-in-out ${
            isFixed
              ? "bg-white/75 shadow-lg backdrop-blur-md"
              : "bg-transparent"
          }`}
        >
          {/* Logo - Centered */}
          <div className="flex-shrink-0">
            <Link href="/" passHref>
              <Image
                src={
                  isFixed
                    ? "/assets/images/logo.svg"
                    : "/assets/images/logo-white.svg"
                }
                alt="Logo"
                width={200}
                height={70}
                className="rounded-xl transition-all duration-300"
              />
            </Link>
          </div>

          {/* Hamburger Menu Button (mobile only) */}
          <div className="flex items-center md:hidden absolute right-14 z-60">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md focus:outline-none"
            >
              <svg
                className={`h-6 w-6 ${isFixed ? "text-black" : "text-white"}`} // Corrected logic
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
                  className={`${
                    isFixed
                      ? "text-gray-950 hover:text-gray-900"
                      : "text-white hover:text-white/90"
                  } hover:bg-[#ED761E] px-4 py-2 rounded-full transition-all duration-300 cursor-pointer`}
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
