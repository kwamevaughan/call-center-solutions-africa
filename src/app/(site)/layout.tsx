import Header from "@/shared/layouts/header";
import Footer from "@/shared/layouts/footer";
import FloatingCTA from "@/shared/components/FloatingCTA";
import { ScrollReveal } from "@/shared/components/ScrollReveal";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollReveal />
      <Header />
      {children}
      <FloatingCTA />
      <Footer />
    </>
  );
}
