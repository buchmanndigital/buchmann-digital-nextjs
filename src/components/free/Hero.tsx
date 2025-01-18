'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, Trophy, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Timer } from './Timer';

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      contentRef.current.classList.add('fade-in-hidden');
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    const element = document.getElementById('contest-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <div 
          ref={contentRef}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-100 rounded-full px-4 py-2 mb-6">
            <Trophy className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-700 font-medium">Limitierte Chance</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
            Gewinne ein Website-Redesign
            <span className="block">im Wert von 5.000 €!</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Bring dein Business auf das nächste Level – mit einer professionellen Website, die deine Konkurrenz in den Schatten stellt.
            <span className="block font-semibold text-indigo-600 mt-2">Komplett kostenfrei!</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={scrollToForm}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg group"
            >
              Jetzt teilnehmen
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Timer />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-600">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
              <Shield className="w-5 h-5 text-indigo-600" />
              <span className="text-sm">100% kostenlos & unverbindlich</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span className="text-sm">Professionelle Beratung garantiert</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}