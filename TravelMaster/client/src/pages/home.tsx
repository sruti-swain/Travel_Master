import { useEffect } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import FloatingKeywords from "@/components/floating-keywords";
import Destinations from "@/components/destinations";
import Features from "@/components/features";
import Statistics from "@/components/statistics";
import Testimonials from "@/components/testimonials";
import Gallery from "@/components/gallery";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";
import Lightbox from "@/components/lightbox";

export default function Home() {
  useEffect(() => {
    // Initialize AOS animations when page loads
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.refresh();
    }
  }, []);

  return (
    <div className="min-h-screen">
      <FloatingKeywords />
      <Navbar />
      <Hero />
      <Destinations />
      <Features />
      <Statistics />
      <Testimonials />
      <Gallery />
      <Newsletter />
      <Footer />
      <Lightbox />
    </div>
  );
}
