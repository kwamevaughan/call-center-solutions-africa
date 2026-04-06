import Slider from "react-slick";
import Image from "next/image";
import { Icon } from "@iconify/react";

const solutions = [
  {
    icon: "https://ik.imagekit.io/nkmvdjnna/CCSA/icons/chat-bubble.png",
    alt: "Inbound & Outbound Customer Service",
    title: "Inbound & Outbound Customer Service",
    description:
      "24/7 multilingual coverage: inquiries, renewals, feedback - improving satisfaction and first-call resolution.",
  },
  {
    icon: "https://ik.imagekit.io/nkmvdjnna/CCSA/icons/headset.svg",
    alt: "Omnichannel Contact Center Operations",
    title: "Omnichannel Contact Center Operations",
    description:
      "Unified voice/chat/email/social. Integrated CRM & analytics for faster responses and reduced costs.",
  },
  {
    icon: "https://ik.imagekit.io/nkmvdjnna/CCSA/icons/online-support.svg",
    alt: "Sales & Revenue Enablement",
    title: "Sales & Revenue",
    titleLine2: "Enablement",
    description:
      "Lead generation, qualification, upselling, renewals — increasing efficiency and reducing CPA.",
  },
  {
    icon: "https://ik.imagekit.io/nkmvdjnna/CCSA/icons/feedback.svg",
    alt: "Customer Retention & Loyalty Management",
    title: "Customer Retention & Loyalty Management",
    description:
      "Behavioral analytics + personalized outreach to reduce churn and boost loyalty participation.",
  },
  {
    icon: "https://ik.imagekit.io/nkmvdjnna/CCSA/icons/question-mark.svg",
    alt: "Technical Support & Product Helpdesk",
    title: "Technical Support & Product Helpdesk",
    description:
      "Tiered support for SaaS, telecoms, and connected products; clearer comms and higher uptime.",
  },
  {
    icon: "https://ik.imagekit.io/nkmvdjnna/CCSA/icons/smilling-face.svg",
    alt: "Claims, Dispute & Verification Processes",
    title: "Claims, Dispute & Verification Processes",
    description:
      "Fast, compliant handling for insurance, fintech, and e-commerce with full auditability.",
  },
  {
    icon: "https://ik.imagekit.io/nkmvdjnna/CCSA/icons/woman.svg",
    alt: "Quality Assurance & CX Analytics",
    title: "Quality Assurance & CX Analytics",
    description:
      "AI-assisted QA and CX intelligence that track accuracy, empathy, and performance in real time.",
  },
  {
    icon: "https://ik.imagekit.io/nkmvdjnna/CCSA/icons/online-support.svg",
    alt: "Back-Office & Administrative Outsourcing",
    title: "Back-Office & Administrative Outsourcing",
    description:
      "Data processing, billing, content moderation, and reporting — cut costs and ensure continuity.",
  },
];

const NextArrow = ({ className, style, onClick }) => (
  <button
    type="button"
    aria-label="Next slide"
    className={`absolute left-auto z-10 mt-3 h-11 w-11 cursor-pointer rounded-full border border-ccsa-dark-blue/15 bg-white p-2 shadow-md transition hover:border-ccsa-orange/40 hover:bg-ccsa-dark-blue/5 sm:h-12 sm:w-12 sm:p-2.5 ${className || ""}`}
    style={{
      ...style,
      top: "100%",
      bottom: "auto",
      left: "auto",
      transform: "none",
      right: 0,
    }}
    onClick={onClick}
  >
    <Icon
      icon="material-symbols:arrow-forward-rounded"
      className="mx-auto block h-5 w-5 text-ccsa-dark-blue sm:h-6 sm:w-6"
    />
  </button>
);

const PrevArrow = ({ className, style, onClick }) => (
  <button
    type="button"
    aria-label="Previous slide"
    className={`absolute left-auto z-10 mt-3 h-11 w-11 cursor-pointer rounded-full border border-ccsa-dark-blue/15 bg-white p-2 shadow-md transition hover:border-ccsa-orange/40 hover:bg-ccsa-dark-blue/5 sm:h-12 sm:w-12 sm:p-2.5 ${className || ""}`}
    style={{
      ...style,
      top: "100%",
      bottom: "auto",
      left: "auto",
      transform: "none",
      right: "3.5rem",
    }}
    onClick={onClick}
  >
    <Icon
      icon="material-symbols:arrow-back-rounded"
      className="mx-auto block h-5 w-5 text-ccsa-dark-blue sm:h-6 sm:w-6"
    />
  </button>
);

function SolutionCard({ item }) {
  return (
    <div className="px-2 pb-1 pt-0 sm:px-3">
      <div className="flex h-full min-h-[280px] flex-col gap-4 rounded-lg bg-ccsa-dark-blue p-6 transition-transform duration-300 hover:-translate-y-1 sm:min-h-[300px] sm:p-8">
        <div className="relative mb-2 h-16 w-16 shrink-0 sm:h-20 sm:w-20">
          <Image
            src={item.icon}
            alt={item.alt}
            width={80}
            height={80}
            className="h-full w-full object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold sm:text-xl">
          <span className="bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
            {item.titleLine2 ? (
              <>
                {item.title}
                <br />
                <span className="inline-block">{item.titleLine2}</span>
              </>
            ) : (
              item.title
            )}
          </span>
        </h3>
        <p className="text-sm leading-relaxed text-white/90 sm:text-base">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function OurSolutionsSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 5500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div
      className="our-solutions-slider relative mt-8 px-2 pb-20 pt-0 sm:mt-12 sm:px-4 [&_.slick-slide]:h-auto [&_.slick-slide>div]:h-full [&_.slick-track]:flex [&_.slick-track]:items-stretch [&_.slick-next::before]:hidden [&_.slick-prev::before]:hidden [&_.slick-next::before]:!content-none [&_.slick-prev::before]:!content-none"
    >
      <Slider {...settings}>
        {solutions.map((item, idx) => (
          <SolutionCard key={idx} item={item} />
        ))}
      </Slider>
    </div>
  );
}
