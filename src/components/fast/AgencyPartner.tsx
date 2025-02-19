'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, Rocket, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AgencyPartner() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="process" className="py-20 bg-gray-50 mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-[#1D2433]/5 rounded-full px-4 py-2 mb-2">
                <Code2 className="w-5 h-5 text-[#1D2433]" />
                <span className="text-[#1D2433] font-medium">Technische Umsetzung</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#1D2433]">
                Ihr Partner für die technische Umsetzung von Kundenprojekten
              </h2>

              <p className="text-lg text-gray-600">
                Konzentrieren Sie sich auf Akquise und Kundenbetreuung – 
                ich übernehme die komplette technische Implementierung Ihrer Projekte.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1D2433]/5 flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-5 h-5 text-[#1D2433]" />
                  </div>
                  <div>
                    <h3 className="text-[#1D2433] font-semibold mb-1">Schnelle Umsetzung</h3>
                    <p className="text-gray-600">
                      Fertige Websites in 3-5 Tagen statt mehreren Wochen
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1D2433]/5 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#1D2433]" />
                  </div>
                  <div>
                    <h3 className="text-[#1D2433] font-semibold mb-1">Flexible Kapazitäten</h3>
                    <p className="text-gray-600">
                      Realisieren Sie mehr Projekte ohne zusätzliches Personal
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={scrollToContact}
                className="bg-[#1D2433] hover:bg-[#1D2433]/90 text-white mt-4 group"
              >
                Projekt anfragen
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Right Column - Image/Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-lg">
                <div className="space-y-6">
                  <div className="bg-[#1D2433]/5 rounded-lg p-6">
                    <h4 className="text-[#1D2433] font-semibold mb-2">So funktioniert's:</h4>
                    <ol className="space-y-4">
                      <li className="flex items-start gap-3 text-gray-600">
                        <span className="w-6 h-6 rounded-full bg-[#1D2433]/5 flex items-center justify-center flex-shrink-0 text-[#1D2433] text-sm">1</span>
                        <span>Sie liefern das Briefing</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-600">
                        <span className="w-6 h-6 rounded-full bg-[#1D2433]/5 flex items-center justify-center flex-shrink-0 text-[#1D2433] text-sm">2</span>
                        <span>Ich entwickle die Website in 3-5 Tagen</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-600">
                        <span className="w-6 h-6 rounded-full bg-[#1D2433]/5 flex items-center justify-center flex-shrink-0 text-[#1D2433] text-sm">3</span>
                        <span>Sie präsentieren das Ergebnis Ihrem Kunden</span>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-[#1D2433]/5 rounded-lg p-6">
                    <h4 className="text-[#1D2433] font-semibold mb-2">Ihre Vorteile:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1D2433]" />
                        <span>Keine Vorauszahlung nötig</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1D2433]" />
                        <span>Zahlung nur bei Zufriedenheit</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1D2433]" />
                        <span>White-Label Entwicklung</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}