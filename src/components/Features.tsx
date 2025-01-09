'use client';

import { useEffect, useRef } from 'react';
import { Users, Target, Rocket, LineChart, ShieldCheck, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Target,
    title: 'Mehr Kunden gewinnen',
    description: 'Erreichen Sie Ihre Zielgruppe mit einer professionellen Website, die Ihre Dienstleistungen optimal präsentiert.'
  },
  {
    icon: Users,
    title: 'Mitarbeiter finden',
    description: 'Präsentieren Sie sich als attraktiver Arbeitgeber und gewinnen Sie die besten Talente für Ihr Unternehmen.'
  },
  {
    icon: Rocket,
    title: 'Schnelle Performance',
    description: 'Optimierte Ladezeiten und responsive Designs sorgen für ein hervorragendes Nutzererlebnis auf allen Geräten.'
  },
  {
    icon: LineChart,
    title: 'Messbare Ergebnisse',
    description: 'Verfolgen Sie Ihren Erfolg mit integrierten Analytics und kontinuierlicher Optimierung.'
  },
  {
    icon: ShieldCheck,
    title: 'Sicher & Zuverlässig',
    description: 'Modernste Sicherheitsstandards und regelmäßige Updates schützen Ihre digitale Präsenz.'
  },
  {
    icon: Zap,
    title: 'Einfach zu verwalten',
    description: 'Intuitive Content-Management-Systeme ermöglichen Ihnen die selbstständige Pflege Ihrer Website.'
  }
];

export function Features() {
  const cardsRef = useRef<HTMLDivElement>(null);

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

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Websites, die Ihr Unternehmen voranbringen
          </h2>
          <p className="text-xl text-gray-300">
            Professionelle Webpräsenzen, die mehr als nur gut aussehen – sie bringen Ihnen messbare Ergebnisse.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-indigo-500 bg-gray-800 hover:bg-gray-700"
            >
              <feature.icon className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center p-1 rounded-full border border-indigo-500/20 bg-indigo-500/10">
            <div className="px-4 py-2 rounded-full bg-indigo-600 text-white font-medium">
              100+ erfolgreiche Projekte
            </div>
            <div className="px-4">
              <span className="text-indigo-300 font-medium">98% zufriedene Kunden</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}