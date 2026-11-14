import Header from "@/layouts/header";
import Footer from "@/layouts/footer";
import FloatingCTA from "@/components/FloatingCTA";
import { ScrollReveal } from "@/components/ScrollReveal";

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
