// pages/delivery-models.js
import Link from "next/link";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import SEO from "@/components/SEO";
import { Icon } from "@iconify/react";
import Image from "next/image";

const DeliveryModels = () => {
  const deliveryModels = [
    {
      title: "Dedicated Teams",
      description:
        "Exclusive teams dedicated to your business, providing consistent service and deep understanding of your brand, products, and customers.",
      features: [
        "100% dedicated resources",
        "Custom training and onboarding",
        "Direct management oversight",
        "Flexible scaling options",
      ],
      icon: "mdi:account-group",
    },
    {
      title: "Shared Resources",
      description:
        "Cost-effective shared resource model ideal for businesses with variable call volumes or looking to optimize costs.",
      features: [
        "Flexible capacity management",
        "Cost-efficient pricing",
        "Multi-client expertise",
        "Scalable infrastructure",
      ],
      icon: "mdi:account-multiple",
    },
    {
      title: "Hybrid Model",
      description:
        "Combination of dedicated and shared resources, offering the perfect balance of consistency and flexibility.",
      features: [
        "Best of both worlds",
        "Optimized cost structure",
        "Flexible resource allocation",
        "Scalable operations",
      ],
      icon: "mdi:account-switch",
    },
    {
      title: "Project-Based",
      description:
        "Short-term or project-specific engagements for campaigns, seasonal support, or special initiatives.",
      features: [
        "Fixed-term contracts",
        "Campaign-specific support",
        "Seasonal scaling",
        "Specialized expertise",
      ],
      icon: "mdi:briefcase",
    },
  ];

  const deploymentOptions = [
    {
      title: "On-Site",
      description:
        "Teams located at your facilities or our secure centers, providing direct oversight and control.",
      icon: "mdi:office-building",
    },
    {
      title: "Remote",
      description:
        "Distributed teams working from secure remote locations, offering flexibility and access to global talent.",
      icon: "mdi:home",
    },
    {
      title: "Hybrid",
      description:
        "Combination of on-site and remote teams, providing the flexibility to meet your specific needs.",
      icon: "mdi:home-city",
    },
  ];

  return (
    <>
      <SEO
        title="Delivery Models | Call Center Solutions Africa"
        description="Explore our flexible delivery models including dedicated teams, shared resources, hybrid models, and project-based engagements. Choose the model that best fits your business needs."
        keywords="delivery models, BPO delivery, dedicated teams, shared resources, hybrid model, call center delivery, customer service delivery"
      />
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          {/* Hero Section */}
          <div className="relative bg-ccsa-dark-blue px-4 py-16 sm:py-20 overflow-hidden">
            <div
              className="absolute left-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, #F45B00 0%, #F45B00 35%, transparent 100%)",
                transform: "translate(-30%, 30%)",
              }}
            />
            <div
              className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, #0088D2 0%, transparent 100%)",
                transform: "translate(30%, -30%)",
              }}
            />

            <div className="relative z-10 max-w-7xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-4 h-4 bg-ccsa-yellow rounded-full flex-shrink-0" />
                <p className="text-lg sm:text-xl font-light text-white uppercase tracking-wide">
                  How We Deliver
                </p>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Flexible Delivery Models
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Choose the delivery model that best fits your business needs,
                whether you need dedicated teams, shared resources, or a hybrid
                approach. We offer flexible deployment options to scale with your
                business.
              </p>
            </div>
          </div>

          {/* Delivery Models Section */}
          <div className="bg-white px-4 py-16 sm:py-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-[#172840] text-center mb-12">
                Our Delivery Models
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {deliveryModels.map((model, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #FFD100 0%, #ED761E 100%)",
                        }}
                      >
                        <Icon
                          icon={model.icon}
                          width={32}
                          height={32}
                          className="text-white"
                        />
                      </div>
                      <h3 className="text-2xl font-semibold text-[#172840]">
                        {model.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-6">{model.description}</p>
                    <ul className="space-y-2">
                      {model.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Icon
                            icon="mdi:check-circle"
                            width={20}
                            height={20}
                            className="text-[#ED761E] flex-shrink-0 mt-0.5"
                          />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Deployment Options */}
          <div className="bg-gray-50 px-4 py-16 sm:py-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-[#172840] text-center mb-4">
                Deployment Options
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                We offer flexible deployment options to meet your security,
                compliance, and operational requirements.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {deploymentOptions.map((option, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300"
                  >
                    <div
                      className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, #FFD100 0%, #ED761E 100%)",
                      }}
                    >
                      <Icon
                        icon={option.icon}
                        width={40}
                        height={40}
                        className="text-white"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-[#172840] mb-4">
                      {option.title}
                    </h3>
                    <p className="text-gray-700">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Choose Our Delivery Models */}
          <div className="bg-white px-4 py-16 sm:py-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-[#172840] text-center mb-12">
                Why Choose Our Delivery Models?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Flexibility",
                    description:
                      "Adapt to changing business needs with scalable models.",
                    icon: "mdi:swap-horizontal",
                  },
                  {
                    title: "Cost Efficiency",
                    description:
                      "Optimize costs while maintaining service quality.",
                    icon: "mdi:currency-usd",
                  },
                  {
                    title: "Scalability",
                    description:
                      "Scale up or down based on demand and growth.",
                    icon: "mdi:chart-line",
                  },
                  {
                    title: "Expertise",
                    description:
                      "Access to specialized talent and industry expertise.",
                    icon: "mdi:account-star",
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-gray-50 rounded-lg"
                  >
                    <Icon
                      icon={benefit.icon}
                      width={48}
                      height={48}
                      className="mx-auto mb-4 text-[#ED761E]"
                    />
                    <h3 className="text-xl font-semibold text-[#172840] mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-700">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative bg-ccsa-dark-blue px-4 py-16 sm:py-20 overflow-hidden">
            <div
              className="absolute left-1/2 top-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)",
                transform: "translate(-50%, -50%)",
              }}
            />

            <div className="relative z-10 max-w-7xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
                Ready to Choose Your Delivery Model?
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-white/90 mb-8 max-w-2xl mx-auto">
                Contact us to discuss which delivery model best fits your
                business needs and requirements.
              </p>
              <Link
                href="/contact-us"
                className="bg-[#ED761E] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D7641B] transition duration-300 inline-flex items-center gap-2"
              >
                <Icon icon="mdi:phone" width={18} height={18} />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default DeliveryModels;

