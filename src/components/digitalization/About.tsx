'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Code2, Brain, Rocket } from 'lucide-react';

export function About() {
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
    <section className="py-20" id="about">
      <div className="container mx-auto px-4">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-radial from-blue-200 via-transparent to-transparent opacity-50 rounded-3xl" />
            <Image
              src="/images/florian-buchmann-2.jpg"
              alt="Florian Buchmann"
              width={600}
              height={400}
              className="rounded-3xl shadow-2xl relative z-10"
            />
            
            <div className="absolute -bottom-4 right-4 md:-bottom-8 md:-right-8 bg-white rounded-lg p-4 shadow-xl z-20">
              <div className="text-2xl font-bold text-blue-600">10+ Jahre</div>
              <div className="text-gray-600">Erfahrung in der Digitalisierung</div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ihr Experte für digitale Transformation
            </h2>
            
            <p className="text-xl text-gray-600">
              Als erfahrener Softwareentwickler und Digitalisierungsexperte unterstütze ich 
              Unternehmen dabei, ihre Prozesse zu automatisieren und effizienter zu gestalten.
            </p>

            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Code2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Maßgeschneiderte Lösungen</h3>
                  <p className="text-gray-600">
                    Entwicklung individueller Softwarelösungen, die exakt auf Ihre Anforderungen zugeschnitten sind.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">KI-Integration</h3>
                  <p className="text-gray-600">
                    Nutzung modernster KI-Technologien zur Automatisierung komplexer Geschäftsprozesse.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Schnelle Implementierung</h3>
                  <p className="text-gray-600">
                    Agile Entwicklung mit schnellen Ergebnissen und kontinuierlicher Optimierung.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}