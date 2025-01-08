'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { User, Trophy, Target } from 'lucide-react';

export function About() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

    const cards = cardsRef.current?.children;
    if (cards) {
      Array.from(cards).forEach((card, index) => {
        card.classList.add('slide-up-hidden');
        // Add delay for staggered animation
        (card as HTMLElement).style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
      });
    }

    if (ctaRef.current) {
      ctaRef.current.classList.add('slide-up-hidden');
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gray-900 text-white" id="about">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Über mich</h2>
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 bg-gray-800 border-gray-700">
            <User className="w-12 h-12 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Mein Profil</h3>
            <p className="text-gray-300">
              Erfahrener Entwickler mit Leidenschaft für digitale Lösungen.
            </p>
          </Card>
          <Card className="p-6 bg-gray-800 border-gray-700">
            <Trophy className="w-12 h-12 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Meine Erfolge</h3>
            <p className="text-gray-300">
              Über 100 erfolgreiche Projekte für zufriedene Kunden.
            </p>
          </Card>
          <Card className="p-6 bg-gray-800 border-gray-700">
            <Target className="w-12 h-12 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Meine Mission</h3>
            <p className="text-gray-300">
              Digitale Lösungen entwickeln, die Ihr Unternehmen nachhaltig voranbringen.
            </p>
          </Card>
        </div>

        <div 
          ref={ctaRef}
          className="bg-indigo-600 rounded-lg p-12 text-center text-white"
          style={{ animationDelay: '0.6s' }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam Ihr Unternehmen digital transformieren
          </h2>
        </div>
      </div>
    </section>
  );
}