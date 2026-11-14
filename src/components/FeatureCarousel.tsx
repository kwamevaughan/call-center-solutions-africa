import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from "@iconify/react";

const features = [
  {
    title: "Technology",
    image: "/assets/images/slide-tech.png",
    bullets: [
      "Complete support from cloud platforms to office setup",
      "AI-powered chatbots & analytics",
      "Scalable for any business size",
    ],
  },
  {
    title: "Advisory",
    image: "/assets/images/slide-advisory.png",
    bullets: [
      "Local compliance support (NDPR, POPIA, Kenya Data Act)",
      "Customer experience & workforce strategy",
      "Expansion support across African markets",
    ],
  },
  {
    title: "Equipment",
    image: "/assets/images/slide-equipment.png",
    bullets: [
      "Ergonomic workstations & noise-canceling headsets",
      "High-speed internet solutions",
      "Custom hardware bundles for smooth operations",
    ],
  },
  {
    title: "Talent",
    image: "/assets/images/slide-talent.png",
    bullets: [
      "Access a large pool of trained call center agents",
      "Technical and non-technical talent available",
      "Rapid onboarding to accelerate your BPO launch",
    ],
  },
];

// Custom arrow components using Iconify
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
      style={{ ...style }}
      onClick={onClick}
    >
      <div className="bg-white border border-black hover:border-blue-400 hover:bg-white/90 rounded-full shadow-lg p-2 sm:p-3 flex items-center justify-center transition-all duration-300 ease-in-out">
        <Icon
          icon="material-symbols:arrow-forward-rounded"
          width="20"
          height="20"
          className="text-gray-800"
        />
      </div>
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
      style={{ ...style }}
      onClick={onClick}
    >
      <div className="bg-white border border-black hover:border-blue-400 hover:bg-white/90 rounded-full shadow-lg p-2 sm:p-3 flex items-center justify-center transition-all duration-300 ease-in-out">
        <Icon
          icon="material-symbols:arrow-back-rounded"
          width="20"
          height="20"
          className="text-gray-800"
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ feature }) => (
  <div className="px-3 sm:px-6">
    <div className="bg-white rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out hover:translate-y-[-5px] overflow-hidden">
      <div className="relative h-48 sm:h-72">
        <Image
          src={feature.image}
          alt={feature.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="relative text-lg sm:text-xl font-bold mb-4 sm:mb-6 mt-[-2em] sm:mt-[-3em]">{feature.title}</h3>
        <ul className="space-y-2">
          {feature.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start">
              <span className="mr-2 text-sm sm:text-base">•</span>
              <span className="text-sm sm:text-base leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const FeatureCarousel = () => {
  const settings = {
    dots: false,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "100px",
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="relative pt-6 sm:pt-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <Slider {...settings}>
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeatureCarousel;
