'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  'Keine Vorauszahlung erforderlich',
  'Zahlung nur bei 100% Zufriedenheit',
  'Volle Unterstützung während des Prozesses',
  'Schnelle Umsetzung in 3-5 Tagen',
  'Professionelle Beratung inklusive',
  'Keine versteckten Kosten'
];

export function TestProject() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <section className="py-20 relative overflow-hidden" id="test-project">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className="relative"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-cyan-900/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-300 font-medium">Risikofreier Start</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Starten Sie mit einem Testprojekt
            </h2>
            <p className="text-xl text-slate-300">
              Überzeugen Sie sich von der Qualität unserer Arbeit ohne finanzielles Risiko
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 backdrop-blur border border-cyan-700/50 rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column - Benefits */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Zahlen Sie erst, wenn Sie zu 100% zufrieden sind
                  </h3>
                  <div className="grid gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - CTA */}
                <div className="flex flex-col justify-center">
                  <div className="bg-slate-900/50 rounded-xl p-6 mb-6">
                    <h4 className="text-xl font-bold text-white mb-4">
                      So funktioniert's:
                    </h4>
                    <ol className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-cyan-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-cyan-400 text-sm">1</span>
                        </div>
                        <span className="text-slate-300">
                          Besprechen Sie mit uns Ihr Projekt
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-cyan-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-cyan-400 text-sm">2</span>
                        </div>
                        <span className="text-slate-300">
                          Wir setzen es professionell um
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-cyan-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-cyan-400 text-sm">3</span>
                        </div>
                        <span className="text-slate-300">
                          Zahlen Sie nur bei voller Zufriedenheit
                        </span>
                      </li>
                    </ol>
                  </div>
                  <Button
                    onClick={scrollToContact}
                    size="lg"
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-6 text-lg group"
                  >
                    Jetzt unverbindlich anfragen
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}