'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function TryWithUs() {
  const router = useRouter();
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-radial from-[#1D2433]/10 via-transparent to-transparent rounded-3xl" />
                <Image
                  src="/images/florian-buchmann.jpg"
                  alt="Florian Buchmann"
                  width={500}
                  height={500}
                  className="rounded-3xl shadow-2xl relative z-10"
                />
                
                <div className="absolute -bottom-4 right-4 md:-bottom-8 md:-right-8 bg-white rounded-lg p-4 shadow-xl z-20">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-[#1D2433]">100+ erfolgreiche Projekte</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D2433]">
                Testen Sie die Zusammenarbeit ohne Risiko
              </h2>

              <p className="text-lg text-gray-600">
                Überzeugen Sie sich von der Qualität meiner Arbeit, bevor Sie sich festlegen. 
                Bezahlen Sie erst, wenn Sie und Ihr Kunde vollständig zufrieden sind.
              </p>

              <div className="space-y-4 bg-[#1D2433]/5 rounded-lg p-6">
                <h3 className="font-semibold text-[#1D2433]">So einfach geht's:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#1D2433]/10 flex items-center justify-center flex-shrink-0 text-[#1D2433] text-sm">1</div>
                    <span className="text-gray-600">Unverbindliches Erstgespräch</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#1D2433]/10 flex items-center justify-center flex-shrink-0 text-[#1D2433] text-sm">2</div>
                    <span className="text-gray-600">Testprojekt nach Ihren Anforderungen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#1D2433]/10 flex items-center justify-center flex-shrink-0 text-[#1D2433] text-sm">3</div>
                    <span className="text-gray-600">Zahlung nur bei voller Zufriedenheit</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={scrollToContact}
                  className="bg-[#1D2433] hover:bg-[#1D2433]/90 text-white group"
                >
                  Jetzt unverbindlich anfragen
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  className="border-[#1D2433] text-[#1D2433] group"
                  onClick={() => router.push('/fast/buchen')}
                >
                  <Calendar className="mr-2 w-4 h-4" />
                  Termin vereinbaren
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}