'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Clock, 
  Briefcase, 
  Shield, 
  Zap,
  CheckCircle2,
  XCircle,
  Users
} from 'lucide-react';

export function CostComparison() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      sectionRef.current.classList.add('slide-up-hidden');
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-white" id="cost-comparison">
      <div className="container mx-auto px-4">
        <div ref={sectionRef}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-medium">Kostenvergleich</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Warum ein externer Digitalisierungspartner?
            </h2>
            <p className="text-xl text-gray-600">
              Vergleichen Sie die Kosten und Vorteile einer Festanstellung mit der Zusammenarbeit mit einem Spezialisten
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Column - Full-time Employee */}
            <div className="space-y-6">
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Festanstellung</h3>
                    <p className="text-gray-600">IT-Fachkraft in Vollzeit</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <span className="font-medium">Bruttogehalt (pro Jahr)</span>
                    <span className="text-red-600 font-bold">76.680 €</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <span className="font-medium">Arbeitgeberkosten (+20%)</span>
                    <span className="text-red-600 font-bold">92.016 €</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <span className="font-medium">Arbeitsplatzkosten</span>
                    <span className="text-red-600 font-bold">10.000 €</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border-t-2 border-red-200">
                    <span className="font-bold">Gesamtkosten pro Jahr</span>
                    <span className="text-red-600 font-bold">102.016 €</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Hohe laufende Kosten</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Lange Einarbeitungszeit</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Krankheit & Urlaub</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Begrenzte Expertise</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - External Partner */}
            <div className="space-y-6">
              <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Externer Partner</h3>
                    <p className="text-gray-600">Professionelle Digitalisierung</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <span className="font-medium">Projektbasierte Abrechnung</span>
                    <span className="text-green-600 font-bold">Nach Bedarf</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <span className="font-medium">Keine Nebenkosten</span>
                    <span className="text-green-600 font-bold">0 €</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <span className="font-medium">Keine Fixkosten</span>
                    <span className="text-green-600 font-bold">0 €</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border-t-2 border-green-200">
                    <span className="font-bold">Durchschnittliche Ersparnis</span>
                    <span className="text-green-600 font-bold">60-80%</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Sofort einsatzbereit</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Jahrelange Erfahrung</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Flexible Verfügbarkeit</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Breites Expertenwissen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto text-center">
            <p className="text-xl text-blue-700 font-medium">
              Sparen Sie Zeit und Geld mit einem erfahrenen Digitalisierungspartner statt einer kostspieligen Festanstellung!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}