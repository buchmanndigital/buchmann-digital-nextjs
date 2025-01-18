import { Footer } from '@/components/Footer';
import { Hero } from '@/components/free/Hero';
import { Benefits } from '@/components/free/Benefits';
import { Process } from '@/components/free/Process';
import { Eligibility } from '@/components/free/Eligibility';
import { FAQ } from '@/components/free/FAQ';
import { ContestForm } from '@/components/free/ContestForm';
import { Testimonials } from '@/components/free/Testimonials';
import { Navigation } from '@/components/free/Navigation';

export default function FreePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Navigation />
      <main className="pt-20">
        <Hero />
        <Benefits />
        <Process />
        <Eligibility />
        <Testimonials />
        <FAQ />
        <ContestForm />
      </main>
      <Footer />
    </div>
  );
}