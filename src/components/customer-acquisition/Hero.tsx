'use client';

import { Button } from '@/components/ui/button';
import { Users, TrendingUp, MapPin } from 'lucide-react';

export function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700 font-medium">Spezialist für das Allgäu</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="block">Gewinnen Sie</span>
                <span className="block">mehr <span className="text-blue-600">Kunden</span></span>
                <span className="block">für Ihr Business</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                Professionelle Kundengewinnung für Allgäuer Unternehmen. 
                Mit lokalem Know-how und modernem Online-Marketing zu messbarem Erfolg.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  onClick={scrollToContact}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
                >
                  Kostenlose Erstberatung
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">100+</div>
                    <div className="text-gray-600">zufriedene Kunden</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">200%</div>
                    <div className="text-gray-600">mehr Anfragen</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative pb-8">
              <div className="absolute inset-0 bg-gradient-radial from-blue-200 via-transparent to-transparent opacity-50 rounded-3xl" />
              <img
                src="/images/florian-buchmann.jpg"
                alt="Kundenberatung"
                className="rounded-3xl shadow-2xl relative z-10"
              />
              <div className="absolute md:-bottom-8 md:-left-8 -bottom-4 left-4 bg-white rounded-lg p-4 shadow-xl z-20 max-w-[200px]">
                <div className="text-2xl font-bold text-blue-600">+180%</div>
                <div className="text-sm text-gray-600 whitespace-normal">durchschnittliche Conversion-Steigerung</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}