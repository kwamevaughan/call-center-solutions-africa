import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

const TestimonialSlider = () => {
  const slides = [
    {
      quote:
        "Call Center Solutions Africa helped us launch a 24/7 support hub in Lagos within 30 days. Their local know-how was invaluable.",
      name: "Chidinma Okoye, CX Lead",
    },
    {
      quote:
        "Thanks to their swift implementation, we were able to set up a customer support center in Nairobi in less than 3 weeks. The team's attention to detail is second to none.",
      name: "Kwame Osei, Head of Operations",
    },
    {
      quote:
        "Their team was critical in helping us scale our customer service operations in Kenya. We are now handling customer queries more efficiently than ever before.",
      name: "Amina Karanja, Customer Support Manager",
    },
    {
      quote:
        "Call Center Solutions Africa helped us streamline our operations in Accra. Their expertise in the local market ensured our success right from the start.",
      name: "Jomo Ababio, Director of Customer Relations",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);

  // Calculate how many slides to display per view (3 for this slider)
  const slidesPerView = 1;
  const totalSlideGroups = Math.ceil(slides.length / slidesPerView);

  const getVisibleSlides = () => {
    const startIndex = currentSlide * slidesPerView;
    return slides.slice(
      startIndex,
      Math.min(startIndex + slidesPerView, slides.length)
    );
  };

  const nextSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) =>
        prev === Math.ceil(slides.length / slidesPerView) - 1 ? 0 : prev + 1
      );
      setIsTransitioning(false);
    }, 500); // Half the transition duration to change slides mid-fade
  };

  const prevSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) =>
        prev === 0 ? Math.ceil(slides.length / slidesPerView) - 1 : prev - 1
      );
      setIsTransitioning(false);
    }, 500); // Half the transition duration to change slides mid-fade
  };

  // Autoplay Logic with Pause on Hover
  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Effect to handle autoplay starting and stopping
  useEffect(() => {
    if (isPaused) {
      stopAutoplay();
    } else {
      startAutoplay();
    }

    return () => stopAutoplay(); // Cleanup on unmount
  }, [isPaused]);

  return (
    <div
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
    >
      <div className="overflow-hidden">
        <div className="flex gap-3 items-center px-4 sm:px-0 md:px-24">
          <div className="w-4 h-4 bg-[#ED761E] rounded-full flex-shrink-0" />
          <p className="text-lg sm:text-xl font-semibold text-white">Testimonial</p>
        </div>
      </div>

      <div
        className={`flex flex-col transition-opacity duration-1000 ease-in-out ${isTransitioning ? "opacity-0" : "opacity-100"}`}
      >
        <div className="flex items-center px-4 sm:px-0 md:px-24 gap-3">
          {getVisibleSlides().map((slide, index) => (
            <div
              key={`${currentSlide}-${index}`}
              className="flex flex-col w-full px-4 py-4 sm:py-6 bg-transparent rounded-lg transition-all duration-300 hover:bg-white/80 hover:translate-y-[-10px] hover:shadow-2xl group"
            >
              <div className="flex flex-col h-full justify-between">
                <p className="text-sm sm:text-base mb-3 sm:mb-4 text-white group-hover:text-black transition-colors duration-300 leading-relaxed">
                  {`${slide.quote}`}
                </p>
                <p className="text-base sm:text-lg text-white group-hover:text-black transition-colors duration-300 font-medium">
                  {slide.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[-1rem] right-2 sm:right-4 flex gap-2">
        <button
          onClick={prevSlide}
          className="bg-[#ED761E] p-1.5 sm:p-2 rounded-full shadow-md hover:bg-[#ED761E]/80 transition-all duration-300 cursor-pointer"
          aria-label="Previous slide"
          disabled={isTransitioning}
        >
          <Icon
            icon="charm:arrow-left"
            width="20"
            height="20"
            className="text-white"
          />
        </button>
        <button
          onClick={nextSlide}
          className="bg-[#ED761E] p-1.5 sm:p-2 rounded-full shadow-md hover:bg-[#ED761E]/80 transition-all duration-300 cursor-pointer"
          aria-label="Next slide"
          disabled={isTransitioning}
        >
          <Icon
            icon="charm:arrow-right"
            width="20"
            height="20"
            className="text-white"
          />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
