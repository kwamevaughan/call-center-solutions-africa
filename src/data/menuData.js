// data/menuData.js
export const menuItems = [
  { href: "/", label: "Home", isAnchor: false },
  { href: "/about-us", label: "About", isAnchor: false },
  { 
    href: "/services", 
    label: "Solutions", 
    isAnchor: false,
    hasDropdown: true,
    submenu: [
      { href: "/services/inbound-outbound-customer-service", label: "Inbound & Outbound Customer Service" },
      { href: "/services/omnichannel-contact-center-operations", label: "Omnichannel Contact Center Operations" },
      { href: "/services/sales-revenue-enablement", label: "Sales & Revenue Enablement" },
      { href: "/services/customer-retention-loyalty", label: "Customer retention & loyalty" },
      { href: "/services/technical-support-help-desk", label: "Technical Support & Help Desk" },
      { href: "/services/claims-dispute-verification", label: "Claims, Dispute & Verification Processes" },
      { href: "/services/quality-assurance-cx-analytics", label: "Quality Assurance & CX Analytics" },
      { href: "/services/back-office-admin-outsourcing", label: "Back-office & Admin Outsourcing" },
    ]
  },
  { href: "/industries", label: "Industries", isAnchor: false },
  { href: "/blog", label: " Insights", isAnchor: false },
  { href: "/careers", label: "Careers", isAnchor: false },
  { href: "/contact-us", label: "Contact Us", isAnchor: false },
];
