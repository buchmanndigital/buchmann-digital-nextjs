'use client';

import { Navigation } from '@/components/digitalization/Navigation';
import { Hero } from '@/components/digitalization/Hero';
import { About } from '@/components/digitalization/About';
import { Benefits } from '@/components/digitalization/Benefits';
import { Process } from '@/components/digitalization/Process';
import { Testimonials } from '@/components/digitalization/Testimonials';
import { FAQ } from '@/components/digitalization/FAQ';
import { ContactForm } from '@/components/digitalization/ContactForm';
import { Footer } from '@/components/Footer';
import { AutomationShowcase } from '@/components/digitalization/AutomationShowcase';
import { ROICalculator } from '@/components/digitalization/ROICalculator';
import { DigitalizationStats } from '@/components/digitalization/DigitalizationStats';

export default function DigitalizationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />
      <main className="pt-20">
        <Hero />
        <About />
        <Benefits />
        <AutomationShowcase />
        <Process />
        <ROICalculator />
        <DigitalizationStats />
        {/* <Testimonials /> */}
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}