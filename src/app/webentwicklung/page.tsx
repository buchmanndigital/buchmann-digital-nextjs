'use client';

import { Navigation } from '@/components/web-development/Navigation';
import { Hero } from '@/components/web-development/Hero';
import { TestProject } from '@/components/web-development/TestProject';
import { Benefits } from '@/components/web-development/Benefits';
import { Process } from '@/components/web-development/Process';
import { Features } from '@/components/web-development/Features';
import { FAQ } from '@/components/web-development/FAQ';
import { ContactForm } from '@/components/web-development/ContactForm';
import { Footer } from '@/components/Footer';
import { WhyUs } from '@/components/web-development/WhyUs';
import { Timeline } from '@/components/web-development/Timeline';
import { QuickDevelopment } from '@/components/web-development/QuickDevelopment';

export default function WebDevelopmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Navigation />
      <main className="pt-20">
        <Hero />
        <TestProject />
        <QuickDevelopment />
        <Benefits />
        <Timeline />
        <Process />
        <Features />
        <WhyUs />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}