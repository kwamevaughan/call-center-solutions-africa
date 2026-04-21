const deliveryModels = [
  {
    image: "https://ik.imagekit.io/nkmvdjnna/CCSA/delivery-model-1.webp",
    imageAlt: "Fully remote delivery team",
    title: "Fully Remote Team (Managed by CCSA Africa)",
    description:
      "Launch a cost-efficient team without the overhead of a physical site. We manage hiring, onboarding, training, WFM, QA, supervision, and reporting across support, sales, engagement, retention, and back office.",
    tags: ["Digital-first", "Fast scaling", "Outbound teams", "After-hours"],
  },
  {
    image: "https://ik.imagekit.io/nkmvdjnna/CCSA/delivery-model-2.webp",
    imageAlt: "Hybrid delivery team setup",
    title: "Hybrid Team Model",
    description:
      "Flexible remote delivery with the structure of an office-based operation. Run high-touch roles on-site, while keeping lead gen, follow-ups, CRM support, or back office remote managed as one integrated program.",
    tags: ["Flex + control", "Multi-function", "Continuity", "Mixed Workflows"],
  },
  {
    image: "https://ik.imagekit.io/nkmvdjnna/CCSA/CCSA-delivery-model-4.webp",
    imageAlt: "On-site managed operations team",
    title: "Fully On-Site at CCSA Nairobi Delivery Center",
    description:
      "Get an office-based team without the cost and complexity of building your own site. Operate from our Nairobi delivery center with infrastructure, supervision, QA, and reporting ideal for structured workflows and daily oversight.",
    tags: ["Stronger Supervision", "Structured Delivery", "Engagement Teams", "Scale in Africa"],
  },
  {
    image: "https://ik.imagekit.io/nkmvdjnna/CCSA/CCSA-delivery-model-3.webp",
    imageAlt: "Blended multi-site CX operations",
    title: "Fully On-Site at Your Dedicated Nairobi Site (Managed by CCSA Africa)",
    description:
      "Need a team at your Nairobi site, managed by an experienced outsourcing partner? We build and run the operation from your site maintaining CCSA standards, quality controls, and performance governance.",
    tags: ["Enterprise", "Regulated", "Brand-sensitive", "Dedicated-setup"],
  },
];

export default function DeliveryModels() {
  return (
    <div className="relative bg-ccsa-dark-blue px-4 py-12 sm:py-20 overflow-hidden">
      <div
        className="absolute left-1/2 top-0 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, #0088D2 0%, transparent 100%)",
          transform: "translate(-50%, -30%)",
        }}
      />
      <div
        className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, #ED761E 0%, #ED761E 35%, transparent 100%)",
          transform: "translate(-30%, 30%)",
        }}
      />
      <div
        className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)",
          transform: "translate(30%, 30%)",
        }}
      />

      <section className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-4 h-4 bg-ccsa-orange rounded-full flex-shrink-0" />
              <p className="text-lg sm:text-xl font-normal text-white uppercase">
                Delivery Models
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight text-white">
              Choose Your Operating Model
            </h2>
          </div>
          <p className="text-base sm:text-lg leading-relaxed text-white/90">
            Remote, hybrid, or fully on-site deployed and managed by CCSA Africa. We
            handle hiring, training, WFM, QA, supervision, and reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deliveryModels.map((model) => (
            <div
              key={model.title}
              className="bg-white/10 border border-white/20 rounded-xl p-4 sm:p-5 backdrop-blur-sm transition-transform duration-300 hover:translate-y-[-5px] flex flex-col"
            >
              <div className="relative w-full h-64 sm:h-72 rounded-lg overflow-hidden mb-4 bg-white/5">
                <img
                  src={model.image}
                  alt={model.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                {model.title}
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-4">
                {model.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {model.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs sm:text-sm bg-white/15 border border-white/25 text-white rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                type="button"
                className="w-full text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:opacity-90 text-sm mt-auto"
                style={{
                  background: "var(--ccsa-gradient)",
                }}
              >
                Launch a remote team
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
