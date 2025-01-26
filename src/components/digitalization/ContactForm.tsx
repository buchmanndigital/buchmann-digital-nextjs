'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function ContactForm() {
  const router = useRouter();

  return (
    <section className="py-20 bg-gray-900" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Bereit für den nächsten Schritt?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Vereinbaren Sie jetzt Ihr kostenloses Erstgespräch und erfahren Sie, 
            wie Sie Ihre Prozesse digitalisieren können.
          </p>
          <Button
            onClick={() => router.push('/digitalisierung/buchen')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg group"
          >
            Jetzt Termin vereinbaren
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}