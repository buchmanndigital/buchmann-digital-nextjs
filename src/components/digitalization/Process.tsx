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
    <section className="py-20 bg-gray-900 relative overflow-hidden" id="process">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-900/50 rounded-full px-4 py-2 mb-6">
            <Settings className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-medium">Unser Prozess</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            So digitalisieren wir Ihre Prozesse
          </h2>
          <p className="text-xl text-gray-300">
            Ein bewährter Prozess für nachhaltige Digitalisierung
          </p>
        </div>

        <div ref={processRef} className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-900/50 via-blue-400/20 to-blue-900/50 transform -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-10" />
                
                <Card className="relative bg-gray-800/50 backdrop-blur p-6 border-t-4 border-blue-500 hover:shadow-2xl transition-all duration-300 h-full border-gray-700">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-blue-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-400">
                        <ArrowRight className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
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