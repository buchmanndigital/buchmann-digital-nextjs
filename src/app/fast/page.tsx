'use client';

import { Navigation } from '@/components/fast/Navigation';
import { Hero } from '@/components/fast/Hero';
import { Stats } from '@/components/fast/Stats';
import { Features } from '@/components/fast/Features';
import { AgencyPartner } from '@/components/fast/AgencyPartner';
import { QuickDevelopment } from '@/components/fast/QuickDevelopment';
import { TryWithUs } from '@/components/fast/TryWithUs';
import { ContactForm } from '@/components/fast/ContactForm';

export default function FastPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Navigation />
      <main>
        <Hero />
        <Stats />
        <Features />
        <AgencyPartner />
        <QuickDevelopment />
        <TryWithUs />
        <ContactForm />
      </main>
    </div>
  );
}