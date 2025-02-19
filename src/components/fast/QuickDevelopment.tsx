'use client';

import { motion } from 'framer-motion';
import { Clock, Code2, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

const codeSteps = [
  { time: '09:00', action: 'Projekt-Setup', code: 'npm create next-app@latest' },
  { time: '09:30', action: 'Komponenten', code: '<Hero />, <Features />' },
  { time: '10:15', action: 'Styling', code: 'className="bg-gradient-to-r ..."' },
  { time: '10:45', action: 'Animationen', code: '<motion.div animate={{ ... }} />' }
];

export function QuickDevelopment() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#1D2433]/5 rounded-full px-4 py-2 mb-6">
              <Clock className="w-5 h-5 text-[#1D2433]" />
              <span className="text-[#1D2433] font-medium">Schnelle Entwicklung</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1D2433]">
              Diese Landing Page ist der Beweis
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Entwickelt in weniger als 4 Stunden mit modernsten Technologien
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {/* Development Timeline */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="p-8"
              >
                <div className="bg-[#1D2433] rounded-lg overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#1D2433]/50 border-b border-gray-700">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="p-6 space-y-4">
                    {codeSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4"
                      >
                        <span className="text-gray-500 font-mono text-sm">{step.time}</span>
                        <div>
                          <span className="text-blue-400 text-sm">{step.action}</span>
                          <div className="font-mono text-sm text-gray-300 mt-1">
                            {step.code}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1D2433]/5 flex items-center justify-center">
                      <Code2 className="w-5 h-5 text-[#1D2433]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1D2433]">Modernste Technologien</h3>
                      <p className="text-gray-600">Next.js, React, Tailwind CSS</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1D2433]/5 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-[#1D2433]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1D2433]">Optimale Performance</h3>
                      <p className="text-gray-600">Lighthouse Score 95+</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Development Process */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="p-8"
              >
                <div className="relative h-full flex flex-col">
                  <h3 className="text-xl font-semibold text-[#1D2433] mb-6">Entwicklungsprozess</h3>
                  
                  <div className="space-y-6">
                    <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
                      <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600" />
                      <h4 className="font-semibold text-[#1D2433] mb-2">Planung & Setup</h4>
                      <p className="text-gray-600">Technologie-Stack auswählen, Projekt initialisieren</p>
                      <div className="text-sm text-gray-500 mt-1">30 Minuten</div>
                    </div>

                    <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
                      <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600" />
                      <h4 className="font-semibold text-[#1D2433] mb-2">Komponenten-Entwicklung</h4>
                      <p className="text-gray-600">Hero, Features, Animationen implementieren</p>
                      <div className="text-sm text-gray-500 mt-1">2 Stunden</div>
                    </div>

                    <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
                      <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600" />
                      <h4 className="font-semibold text-[#1D2433] mb-2">Optimierung</h4>
                      <p className="text-gray-600">Performance, SEO, Mobile Responsiveness</p>
                      <div className="text-sm text-gray-500 mt-1">1 Stunde</div>
                    </div>

                    <div className="relative pl-8">
                      <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-green-500" />
                      <h4 className="font-semibold text-[#1D2433] mb-2">Fertigstellung</h4>
                      <p className="text-gray-600">Finale Tests und Deployment</p>
                      <div className="text-sm text-gray-500 mt-1">30 Minuten</div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-[#1D2433]">
                        <span className="font-semibold">Gesamtzeit:</span>
                        <span className="font-bold">4 Stunden</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}