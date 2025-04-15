import Image from "next/image";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image: "/assets/images/hero-1.jpg",
    alt: "Call Center Africa",
  },
  {
    id: 2,
    image: "/assets/images/hero-2.jpg",
    alt: "BPO Services",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto-slide every 5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            layout="fill"
            objectFit="cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* 🔥 Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none"></div>

      {/* Dots or any other foreground content */}
      <div className="absolute bottom-10 right-6 flex flex-col gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-300
          ${
            idx === currentSlide
              ? "bg-[#F45B00] border-[#F45B00]"
              : "bg-transparent border-white/70 hover:border-[#F45B00]"
          }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
