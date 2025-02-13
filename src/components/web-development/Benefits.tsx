'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Rocket, 
  Shield, 
  Users, 
  Target,
  Zap,
  Code
} from 'lucide-react';

const benefits = [
  {
    icon: Rocket,
    title: 'Schnelle Umsetzung',
    description: 'Professionelle Entwicklung Ihrer Kundenprojekte in wenigen Tagen statt Wochen.'
  },
  {
    icon: Shield,
    title: 'White-Label',
    description: 'Ihre Kunden sehen Sie als Entwickler – perfekte Integration in Ihre Agenturprozesse.'
  },
  {
    icon: Target,
    title: 'Optimierte Prozesse',
    description: 'Weniger Korrekturschleifen durch strukturierte Workflows und klare Kommunikation.'
  },
  {
    icon: Users,
    title: 'Mehr Kapazität',
    description: 'Realisieren Sie mehr Projekte ohne zusätzliches Personal einzustellen.'
  },
  {
    icon: Code,
    title: 'Technisch sauber',
    description: 'SEO-optimiert, performant und nach modernsten Standards entwickelt.'
  },
  {
    icon: Zap,
    title: 'Flexibel skalierbar',
    description: 'Von einfachen Business-Websites bis zu komplexen Projekten.'
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ihre Vorteile
          </h2>
          <p className="text-xl text-slate-300">
            Profitieren Sie von effizienten Prozessen und professioneller Umsetzung
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="p-6 bg-slate-800/50 backdrop-blur border-slate-700 hover:bg-slate-700/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
              <p className="text-slate-300">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}