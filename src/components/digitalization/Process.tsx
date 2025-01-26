'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Search, 
  Settings, 
  Rocket, 
  LineChart,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Analyse',
    description: 'Wir analysieren Ihre aktuellen Prozesse und identifizieren Automatisierungspotenziale.',
    details: [
      'Prozessaufnahme',
      'Schwachstellenanalyse',
      'Potenzialermittlung',
      'Technologie-Assessment'
    ]
  },
  {
    icon: Settings,
    title: 'Konzeption',
    description: 'Gemeinsam entwickeln wir eine maßgeschneiderte Digitalisierungsstrategie.',
    details: [
      'Lösungsdesign',
      'Technologieauswahl',
      'Roadmap-Erstellung',
      'ROI-Berechnung'
    ]
  },
  {
    icon: Rocket,
    title: 'Umsetzung',
    description: 'Wir implementieren die Lösung schrittweise und schulen Ihre Mitarbeiter.',
    details: [
      'Agile Entwicklung',
      'Kontinuierliche Tests',
      'Mitarbeiterschulung',
      'Dokumentation'
    ]
  },
  {
    icon: LineChart,
    title: 'Optimierung',
    description: 'Durch kontinuierliches Monitoring optimieren wir die Prozesse weiter.',
    details: [
      'KPI-Tracking',
      'Performance-Analyse',
      'Prozessoptimierung',
      'Weiterentwicklung'
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
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden" id="process">
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            So digitalisieren wir Ihre Prozesse
          </h2>
          <p className="text-xl text-gray-600">
            Ein bewährter Prozess für nachhaltige Digitalisierung
          </p>
        </div>

        <div ref={processRef} className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 transform -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                
                <Card className="relative bg-white/90 backdrop-blur p-6 border-t-4 border-blue-500 hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                        <ArrowRight className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {/* Connection Arrow for larger screens */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 translate-x-full z-10">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}