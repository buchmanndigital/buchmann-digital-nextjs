'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Rocket, Users, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function AboutMe() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.3 });

  return (
    <section className="py-16 relative overflow-hidden" id="about-me">
      {/* Background Elemente */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Das bin ich
          </h2>
          <p className="text-lg text-gray-300">
            Ein paar Worte über mich und meine 100-Projekte-Mission
          </p>
        </motion.div>

        <div 
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Bild-Container */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-3xl transform -rotate-3 scale-105" />
            <div className="relative bg-gray-800/80 p-6 rounded-3xl border border-gray-700 shadow-xl">
              <div className="mx-auto w-full md:w-3/4 aspect-square relative">
                <Image
                  src="/images/florian-buchmann.jpg"
                  alt="Florian Buchmann"
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Text-Container */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white">Florian Buchmann</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Als selbstständiger Software-Entwickler aus dem Allgäu habe ich mich auf die Entwicklung 
              moderner Webseiten und digitaler Lösungen spezialisiert. Mit meiner "100 Projekte Challenge" 
              möchte ich nicht nur meine Fähigkeiten zeigen, sondern auch eine breite Palette an Projekten realisieren.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Jedes ausgefüllte Feld steht für ein abgeschlossenes Projekt - von Unternehmenswebseiten 
              über Mitarbeiterkampagnen bis zu digitalen Tools. Die verbleibenden Felder warten darauf, 
              mit spannenden neuen Projekten gefüllt zu werden.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex items-start space-x-4">
                <div className="bg-indigo-900/80 p-2 rounded-md">
                  <Code className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Full-Stack Dev</h4>
                  <p className="text-gray-400 text-sm">React, NextJS, TypeScript</p>
                </div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex items-start space-x-4">
                <div className="bg-indigo-900/80 p-2 rounded-md">
                  <Rocket className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Schnelle Umsetzung</h4>
                  <p className="text-gray-400 text-sm">In wenigen Tagen zum Ziel</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}