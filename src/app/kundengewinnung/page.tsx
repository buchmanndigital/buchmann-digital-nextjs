'use client';

import { useState } from 'react';
import { Navigation } from '@/components/customer-acquisition/Navigation';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/customer-acquisition/Hero';
import { Process } from '@/components/customer-acquisition/Process';
import { Services } from '@/components/customer-acquisition/Services';
import { FAQ } from '@/components/customer-acquisition/FAQ';
import { ContactForm } from '@/components/customer-acquisition/ContactForm';
import { Pricing } from '@/components/customer-acquisition/Pricing';
import { Personal } from '@/components/customer-acquisition/Personal';
import { TrafficSource } from '@/components/customer-acquisition/TrafficSource';

export default function CustomerAcquisitionPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />
      <main className="pt-20">
        <Hero />
        <Personal />
        <Process />
        <Services />
        <TrafficSource />
        <Pricing setSelectedPackage={setSelectedPackage} />
        <FAQ />
        <ContactForm selectedPackage={selectedPackage} />
      </main>
      <Footer />
    </div>
  );
}