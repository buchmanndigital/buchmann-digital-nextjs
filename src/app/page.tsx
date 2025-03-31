import { Header } from '@/components/Header';
import { Hero } from '@/components/home/Hero';
import { FreeAnalysis } from '@/components/home/FreeAnalysis';
import { PromotionBanner } from '@/components/home/PromotionBanner';
import { RoadmapSection } from '@/components/home/RoadmapSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { AboutMe } from '@/components/home/AboutMe';
import { References } from '@/components/home/References';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <PromotionBanner />
        <RoadmapSection />
        <TestimonialsSection />
        <AboutMe />
        <FreeAnalysis />
        <References />
        <Footer />
      </main>
    </div>
  );
}