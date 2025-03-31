'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CalendarDays, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function References() {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Linke Seite - 3D Figur */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-indigo-100 rounded-3xl transform rotate-3 scale-95 opacity-30" />
            <div className="relative">
              <Image
                src="/images/home/florian-buchmann-3d-standing-macbook.png"
                alt="Florian Buchmann 3D mit Macbook"
                width={600}
                height={600}
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Rechte Seite - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 bg-indigo-50 rounded-full px-4 py-2 mb-6"
              >
                <Users className="w-5 h-5 text-indigo-600" />
                <span className="text-indigo-700 font-medium">Erfolgsgeschichte</span>
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Von 0 auf 100: <br />
                <span className="text-indigo-600">Direkte Kundenanfragen</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8">
                Für Fliesen Kamberger aus dem Allgäu haben wir eine moderne Website entwickelt. 
                Das Ergebnis: Bereits nach wenigen Tagen gingen die ersten Kundenanfragen direkt über die Website ein.
              </p>
            </div>

            {/* Erfolgsmetriken */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <CalendarDays className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Schnelle Umsetzung</h3>
                </div>
                <p className="text-gray-600">Von der Idee bis zur fertigen Website in wenigen Tagen</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Users className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Direkte Anfragen</h3>
                </div>
                <p className="text-gray-600">Neue Kunden durch optimierte Online-Präsenz</p>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Link 
                href="/kontakt" 
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium py-3.5 px-7 rounded-lg text-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Dein Projekt starten</span>
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 