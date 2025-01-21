'use client';

import { useEffect, useRef } from 'react';
import { Search, Layout, Share2, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

const steps = [
  {
    icon: Search,
    title: 'Analyse',
    description: 'Ich analysiere Ihre aktuelle Situation, Ihre Zielgruppe und Ihre Wettbewerber.',
    details: [
      'Marktanalyse',
      'Zielgruppen-Definition',
      'Wettbewerbs-Analyse',
      'Potenzial-Ermittlung'
    ]
  },
  {
    icon: Layout,
    title: 'Strategie',
    description: 'Basierend auf der Analyse entwickle ich eine maßgeschneiderte Strategie für Ihr Unternehmen.',
    details: [
      'Kanal-Auswahl',
      'Budget-Planung',
      'Content-Strategie',
      'Zeitplan-Erstellung'
    ]
  },
  {
    icon: Share2,
    title: 'Umsetzung',
    description: 'Ich setze die Strategie professionell um und optimiere kontinuierlich.',
    details: [
      'Website-Entwicklung',
      'Kampagnen-Start',
      'Content-Erstellung',
      'Performance-Tracking'
    ]
  },
  {
    icon: Users,
    title: 'Erfolg',
    description: 'Sie gewinnen neue Kunden und ich optimiere weiter für noch bessere Ergebnisse.',
    details: [
      'Mehr Anfragen',
      'Qualifizierte Leads',
      'Messbarer ROI',
      'Kontinuierliches Wachstum'
    ]
  }
];

export function Process() {
  const processRef = useRef<HTMLDivElement>(null);

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

    const cards = processRef.current?.children;
    if (cards) {
      Array.from(cards).forEach((card, index) => {
        card.classList.add('slide-up-hidden');
        (card as HTMLElement).style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20" id="process">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            So gewinne ich neue Kunden für Sie
          </h2>
          <p className="text-xl text-gray-600">
            Ein bewährter Prozess für nachhaltige Kundengewinnung im Allgäu
          </p>
        </div>

        <div ref={processRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <step.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600 mb-4">{step.description}</p>
              <ul className="space-y-2">
                {step.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                    {detail}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}