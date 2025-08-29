// components/LogoMarquee.js
"use client";

import Image from "next/image";
import styles from "./LogoMarquee.module.css";

const LogoMarquee = () => {
  const logos = [
    "/assets/images/partners/acronis.svg",
    "/assets/images/partners/aws.svg",
    "/assets/images/partners/microsoft-cloud.svg",
    "/assets/images/partners/backblaze.svg",
    "/assets/images/partners/connexai.svg",
    "/assets/images/partners/google-cloud.svg",
  ];

  const renderLogos = logos.map((logo, index) => (
    <div key={index} className={styles.logoItem}>
      <Image
        src={logo}
        width={120}
        height={0}
        alt={`Partner Logo ${index + 1}`}
        className={styles.logo}
      />
    </div>
  ));

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marquee}>
        {renderLogos}
        {renderLogos} {/* Duplicate for seamless loop */}
      </div>
    </div>
  );
};

export default LogoMarquee;
