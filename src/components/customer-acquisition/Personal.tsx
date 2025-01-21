'use client';

import { useEffect, useRef } from 'react';
import { Heart, Mountain, Users, Coffee } from 'lucide-react';

export function Personal() {
  const contentRef = useRef<HTMLDivElement>(null);

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

    if (contentRef.current) {
      contentRef.current.classList.add('slide-up-hidden');
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 relative overflow-hidden" id="personal">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative pb-8">
              <div className="absolute inset-0 bg-gradient-radial from-blue-200 via-transparent to-transparent opacity-50 rounded-3xl" />
              <img
                src="/images/florian-buchmann-2.jpg"
                alt="Florian Buchmann"
                className="rounded-3xl shadow-2xl relative z-10"
              />
              
              <div className="absolute -bottom-4 right-4 md:bottom-4 md:right-4 bg-white rounded-lg p-4 shadow-xl z-20">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Heart className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Geboren & aufgewachsen im Allgäu</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Ihr Partner für digitalen Erfolg im Allgäu
              </h2>
              
              <p className="text-xl text-gray-600">
                Als gebürtiger Immenstädter kenne ich nicht nur die digitale Welt, sondern auch die 
                Besonderheiten und Herausforderungen der Region. Meine Mission ist es, Allgäuer 
                Unternehmen dabei zu helfen, ihr volles Potenzial online zu entfalten.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mountain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Lokale Expertise</h3>
                    <p className="text-gray-600">Tiefes Verständnis für den Allgäuer Markt und seine Menschen</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Persönliche Betreuung</h3>
                    <p className="text-gray-600">Direkter Ansprechpartner vor Ort, keine anonyme Agentur</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Coffee className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Kurze Wege</h3>
                    <p className="text-gray-600">Regelmäßige Vor-Ort-Termine und schnelle Reaktionszeiten</p>
                  </div>
                </div>
              </div>

              <blockquote className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border-l-4 border-blue-600 italic text-gray-600">
                "Als Allgäuer weiß ich, wie wichtig Vertrauen und persönlicher Kontakt in unserer Region sind. 
                Genau das biete ich meinen Kunden - kombiniert mit modernster digitaler Expertise."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}