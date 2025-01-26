'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Clock, 
  TrendingUp, 
  Shield, 
  Users, 
  LineChart, 
  Zap,
  Cloud,
  Bot,
  Settings
} from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Zeitersparnis',
    description: 'Automatisieren Sie repetitive Aufgaben und gewinnen Sie wertvolle Zeit für strategische Aktivitäten.'
  },
  {
    icon: TrendingUp,
    title: 'Kosteneinsparung',
    description: 'Reduzieren Sie Betriebskosten durch effizientere Prozesse und optimierte Ressourcennutzung.'
  },
  {
    icon: Shield,
    title: 'Fehlerreduktion',
    description: 'Minimieren Sie menschliche Fehler durch standardisierte und automatisierte Abläufe.'
  },
  {
    icon: Users,
    title: 'Bessere Zusammenarbeit',
    description: 'Fördern Sie die teamübergreifende Zusammenarbeit durch digitale Workflows.'
  },
  {
    icon: LineChart,
    title: 'Messbare Ergebnisse',
    description: 'Verfolgen Sie KPIs in Echtzeit und treffen Sie datenbasierte Entscheidungen.'
  },
  {
    icon: Zap,
    title: 'Schnelle Integration',
    description: 'Implementieren Sie Lösungen in wenigen Wochen und sehen Sie sofort Ergebnisse.'
  },
  {
    icon: Cloud,
    title: 'Cloud-basiert',
    description: 'Greifen Sie von überall auf Ihre Systeme zu und bleiben Sie flexibel.'
  },
  {
    icon: Bot,
    title: 'KI-Unterstützung',
    description: 'Nutzen Sie modernste KI-Technologien für intelligente Automatisierung.'
  },
  {
    icon: Settings,
    title: 'Skalierbarkeit',
    description: 'Wachsen Sie ohne Einschränkungen und passen Sie Systeme flexibel an.'
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
    <section className="py-20 bg-gray-50" id="benefits">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vorteile der Digitalisierung
          </h2>
          <p className="text-xl text-gray-600">
            Entdecken Sie, wie die Digitalisierung Ihrer Prozesse Ihr Unternehmen transformieren kann
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-blue-600" />
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