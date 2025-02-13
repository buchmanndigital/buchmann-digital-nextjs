'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Clock, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
        <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-cyan-900/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-300 font-medium">Für Agenturen</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="block">Webprojekte für Ihre Kunden –</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
                in wenigen Tagen statt Wochen
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Technische Umsetzung für Agenturen, die mehr Aufträge effizient abwickeln möchten – 
              ohne interne Ressourcen zu binden.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-lg group"
              >
                Unverbindlich anfragen
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700">
                <Clock className="w-8 h-8 text-cyan-400 mb-2 mx-auto" />
                <div className="text-2xl font-bold text-cyan-400">3-5 Tage</div>
                <p className="text-slate-300">Durchschnittliche Umsetzungszeit</p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700">
                <Code className="w-8 h-8 text-cyan-400 mb-2 mx-auto" />
                <div className="text-2xl font-bold text-cyan-400">100+</div>
                <p className="text-slate-300">Erfolgreich umgesetzte Projekte</p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700">
                <Zap className="w-8 h-8 text-cyan-400 mb-2 mx-auto" />
                <div className="text-2xl font-bold text-cyan-400">White Label</div>
                <p className="text-slate-300">Ihr Branding, nicht meins</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}