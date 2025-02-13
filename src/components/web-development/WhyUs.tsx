'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Clock, 
  Code, 
  Users, 
  CheckCircle2,
  Zap,
  Shield
} from 'lucide-react';

const reasons = [
  {
    icon: Clock,
    title: 'Schnelle Umsetzung',
    description: 'Durch optimierte Prozesse und jahrelange Erfahrung realisieren wir Projekte in wenigen Tagen.'
  },
  {
    icon: Code,
    title: 'Technische Expertise',
    description: 'Profundes Know-how in modernen Webtechnologien und Best Practices.'
  },
  {
    icon: Users,
    title: 'Agenturerfahrung',
    description: 'Langjährige Erfahrung in der Zusammenarbeit mit Agenturen und deren Kunden.'
  },
  {
    icon: CheckCircle2,
    title: 'Qualitätsstandards',
    description: 'Sauberer Code, Performance-Optimierung und SEO-Best-Practices.'
  },
  {
    icon: Zap,
    title: 'Flexible Skalierung',
    description: 'Kurzfristig verfügbare Kapazitäten für Ihre Projekte.'
  },
  {
    icon: Shield,
    title: 'Zuverlässigkeit',
    description: 'Termintreue und transparente Kommunikation in allen Projektphasen.'
  }
];

export function WhyUs() {
  const reasonsRef = useRef<HTMLDivElement>(null);

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

    const cards = reasonsRef.current?.children;
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
    <section className="py-20" id="why-us">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Warum mit uns zusammenarbeiten?
          </h2>
          <p className="text-xl text-slate-300">
            Profitieren Sie von unserer Expertise und Erfahrung
          </p>
        </div>

        <div ref={reasonsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Card 
              key={index} 
              className="p-6 bg-slate-800/50 backdrop-blur border-slate-700 hover:bg-slate-700/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-4">
                <reason.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{reason.title}</h3>
              <p className="text-slate-300">{reason.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}