import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { FAQ } from '@/components/FAQ';
import { ContactForm } from '@/components/ContactForm';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { Features } from '@/components/Features';
import { WebsiteAnalysis } from '@/components/WebsiteAnalysis';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <div className="container mx-auto px-4">
          <Services />
        </div>
        <Features />
        <WebsiteAnalysis />
        <div className="container mx-auto px-4 mb-10">
          <FAQ />
          <CTA />
        </div>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}