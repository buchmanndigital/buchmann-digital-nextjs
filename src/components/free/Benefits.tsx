'use client';

import { useEffect, useRef } from 'react';
import { Smartphone, Zap, Search, Palette, Users, BarChart } from 'lucide-react';
import { Card } from '@/components/ui/card';

const benefits = [
  {
    icon: Palette,
    title: 'Individuelles Design',
    description: 'Ein maßgeschneidertes Design, das deine Markenidentität perfekt widerspiegelt.'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First',
    description: 'Optimiert für alle Geräte, damit deine Kunden dich überall perfekt erreichen.'
  },
  {
    icon: Zap,
    title: 'Blitzschnell',
    description: 'Optimierte Ladezeiten für ein besseres Nutzererlebnis und höhere Conversion-Rates.'
  },
  {
    icon: Search,
    title: 'SEO-optimiert',
    description: 'Bessere Sichtbarkeit bei Google durch modernste SEO-Praktiken.'
  },
  {
    icon: Users,
    title: 'Conversion-optimiert',
    description: 'Designed, um Besucher in Kunden zu verwandeln.'
  },
  {
    icon: BarChart,
    title: 'Analytics & Tracking',
    description: 'Verstehe deine Besucher besser mit integrierten Analyse-Tools.'
  }
];

export function Benefits() {
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
        (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20" id="benefits">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Das erwartet den Gewinner
          </h2>
          <p className="text-xl text-gray-600">
            Ein komplettes Website-Paket im Wert von 5.000 €, das dein Business auf das nächste Level hebt.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 h-full bg-white hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}