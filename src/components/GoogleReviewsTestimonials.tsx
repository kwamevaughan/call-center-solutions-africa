"use client";

import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { googleReviews, placeInfo as staticPlaceInfo } from "@/data/googleReviews";

const GoogleReviewsTestimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [placeInfo, setPlaceInfo] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Use static reviews data (no API calls needed)
    if (googleReviews && googleReviews.length > 0) {
      setReviews(googleReviews);
      setPlaceInfo(staticPlaceInfo);
    }
  }, []);

  // Responsive slides per view based on screen size
  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (width >= 1024) {
        setSlidesPerView(3); // Desktop: 3 reviews
      } else if (width >= 768) {
        setSlidesPerView(2); // Tablet: 2 reviews
      } else {
        setSlidesPerView(1); // Mobile: 1 review
      }
    };

    // Set initial value
    if (typeof window !== "undefined") {
      updateSlidesPerView();
      window.addEventListener("resize", updateSlidesPerView);
      return () => window.removeEventListener("resize", updateSlidesPerView);
    }
  }, []);

  const totalSlides = Math.ceil(reviews.length / slidesPerView);

  const getVisibleSlides = () => {
    const startIndex = currentSlide * slidesPerView;
    return reviews.slice(
      startIndex,
      Math.min(startIndex + slidesPerView, reviews.length)
    );
  };

  const nextSlide = () => {
    if (isTransitioning || reviews.length === 0) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) =>
        prev === totalSlides - 1 ? 0 : prev + 1
      );
      setIsTransitioning(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isTransitioning || reviews.length === 0) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) =>
        prev === 0 ? totalSlides - 1 : prev - 1
      );
      setIsTransitioning(false);
    }, 500);
  };

  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (reviews.length > 1) {
      intervalRef.current = setInterval(nextSlide, 5000);
    }
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

  useEffect(() => {
    if (isPaused || reviews.length <= 1) {
      stopAutoplay();
    } else {
      startAutoplay();
    }

    return () => stopAutoplay();
  }, [isPaused, reviews.length]);

  const renderStars = (rating, size = 18) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon
          key={`star-${i}`}
          icon="mdi:star"
          className="text-yellow-400"
          width={size}
          height={size}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon
          key="star-half"
          icon="mdi:star-half-full"
          className="text-yellow-400"
          width={size}
          height={size}
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon
          key={`star-empty-${i}`}
          icon="mdi:star-outline"
          className="text-gray-300"
          width={size}
          height={size}
        />
      );
    }

    return stars;
  };

  if (reviews.length === 0) {
    return null; // Don't show section if no reviews
  }

  return (
    <section
      className="bg-ccsa-dark-blue relative py-10 sm:py-16 md:py-20 overflow-hidden"
      id="testimonials"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
    >
      {/* Radial Ellipse at Top Left */}
      <div
        className="absolute left-0 top-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #F45B00 0%, #F45B00 35%, transparent 100%)",
          transform: "translate(-30%, -30%)",
        }}
      />
      {/* Radial Ellipse at Bottom Right */}
      <div
        className="absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)",
          transform: "translate(30%, 30%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-ccsa-yellow rounded-full flex-shrink-0" />
            <p className="text-xs sm:text-sm md:text-base font-semibold text-white/90 uppercase tracking-wider">
              Client Testimonials
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
            What Our Clients Say
          </h2>
          {placeInfo && (
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-2 px-4">
              <div className="flex items-center gap-0.5 sm:gap-1">
                {renderStars(placeInfo.rating, windowWidth < 640 ? 16 : 20)}
              </div>
              <span className="text-sm sm:text-base md:text-lg font-semibold text-white">
                {placeInfo.rating}
              </span>
              <span className="text-white/70 text-xs sm:text-sm md:text-base">
                out of 5
              </span>
              <span className="text-white/50 hidden sm:inline">•</span>
              <span className="text-white/70 text-xs sm:text-sm md:text-base">
                {placeInfo.totalRatings} Google Reviews
              </span>
            </div>
          )}
          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <Icon
              icon="mdi:google"
              className="text-white"
              width={20}
              height={20}
            />
            <span className="text-white/80 text-xs sm:text-sm">Verified Reviews</span>
          </div>
        </div>

        <div className="relative">
          <div
            className={`transition-opacity duration-700 ease-in-out ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {getVisibleSlides().map((review, index) => (
                <div
                  key={`${currentSlide}-${index}`}
                  className="flex flex-col bg-white rounded-xl p-4 sm:p-6 md:p-8 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
                >
                  {/* Review Header */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
                    {review.profile_photo_url ? (
                      <img
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0 ring-2 ring-gray-100"
                      />
                    ) : (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-ccsa-orange to-ccsa-yellow flex items-center justify-center flex-shrink-0 ring-2 ring-gray-100">
                        <span className="text-white font-bold text-base sm:text-lg">
                          {review.author_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-ccsa-dark-blue font-semibold text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2 break-words">
                        {review.author_name}
                      </h3>
                      <div className="flex items-center gap-1 sm:gap-2 mb-1">
                        {renderStars(review.rating, windowWidth < 640 ? 14 : 18)}
                      </div>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        {review.relative_time_description}
                      </p>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="flex-1 mb-3 sm:mb-4">
                    <div className="relative">
                      <Icon
                        icon="mdi:format-quote-open"
                        className="text-ccsa-orange/20 absolute -top-1 -left-1 sm:-top-2 sm:-left-1"
                        width={windowWidth < 640 ? 32 : 40}
                        height={windowWidth < 640 ? 32 : 40}
                      />
                      <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed relative z-10">
                        {review.text}
                      </p>
                    </div>
                  </div>

                  {/* Google Badge */}
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Icon
                        icon="mdi:google"
                        className="text-ccsa-orange"
                        width={16}
                        height={16}
                      />
                      <span className="text-gray-600 text-xs font-medium">
                        Google Review
                      </span>
                    </div>
                    {review.author_url && (
                      <a
                        href={review.author_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-ccsa-orange hover:text-ccsa-orange/80 text-xs font-medium transition-colors"
                      >
                        <span>View</span>
                        <Icon
                          icon="mdi:arrow-top-right"
                          width={12}
                          height={12}
                        />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          {reviews.length > slidesPerView && (
            <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-10 md:mt-12">
              <button
                onClick={prevSlide}
                className="group bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm border border-white/30 p-2 sm:p-2.5 md:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                aria-label="Previous reviews"
                disabled={isTransitioning}
              >
                <Icon
                  icon="mdi:chevron-left"
                  width={20}
                  height={20}
                  className="sm:w-6 sm:h-6 text-white group-hover:text-ccsa-yellow transition-colors"
                />
              </button>
              
              <div className="flex items-center gap-1.5 sm:gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isTransitioning) {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setCurrentSlide(index);
                          setIsTransitioning(false);
                        }, 500);
                      }
                    }}
                    className={`rounded-full transition-all duration-300 touch-manipulation ${
                      index === currentSlide
                        ? "bg-ccsa-orange w-8 sm:w-10 h-2 sm:h-2.5 shadow-md"
                        : "bg-white/30 hover:bg-white/50 active:bg-white/60 w-2 sm:w-2.5 h-2 sm:h-2.5"
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="group bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm border border-white/30 p-2 sm:p-2.5 md:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                aria-label="Next reviews"
                disabled={isTransitioning}
              >
                <Icon
                  icon="mdi:chevron-right"
                  width={20}
                  height={20}
                  className="sm:w-6 sm:h-6 text-white group-hover:text-ccsa-yellow transition-colors"
                />
              </button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        {placeInfo && placeInfo.googleMapsUrl && (
          <div className="mt-8 sm:mt-12 md:mt-16 text-center px-4">
            <a
              href={placeInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm border border-white/30 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-white text-sm sm:text-base font-medium transition-all duration-300 hover:shadow-lg group touch-manipulation"
            >
              <Icon icon="mdi:google" width={18} height={18} className="sm:w-5 sm:h-5" />
              <span className="whitespace-nowrap">
                Read all <span className="hidden sm:inline">{placeInfo.totalRatings} </span>reviews
              </span>
              <span className="hidden sm:inline">on Google</span>
              <Icon 
                icon="mdi:arrow-top-right" 
                width={16} 
                height={16}
                className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default GoogleReviewsTestimonials;

