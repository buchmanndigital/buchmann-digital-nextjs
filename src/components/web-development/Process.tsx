'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { 
  FileText, 
  Code, 
  Rocket, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Briefing & Planung',
    description: 'Klare Anforderungen und Zeitplan',
    details: [
      'Detaillierte Anforderungsanalyse',
      'Technische Spezifikation',
      'Zeitplan & Meilensteine',
      'Ressourcenplanung'
    ]
  },
  {
    icon: Code,
    title: 'Entwicklung',
    description: 'Schnelle & saubere Umsetzung',
    details: [
      'Moderne Technologien',
      'Responsive Design',
      'SEO-Optimierung',
      'Performance-Fokus'
    ]
  },
  {
    icon: CheckCircle2,
    title: 'Review & Tests',
    description: 'Qualitätssicherung',
    details: [
      'Cross-Browser Tests',
      'Mobile Optimierung',
      'Performance-Checks',
      'SEO-Validierung'
    ]
  },
  {
    icon: Rocket,
    title: 'Launch',
    description: 'Reibungsloser Start',
    details: [
      'Deployment-Vorbereitung',
      'Server-Konfiguration',
      'DNS-Setup',
      'Go-Live Support'
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Strukturierter Entwicklungsprozess
          </h2>
          <p className="text-xl text-slate-300">
            Ein bewährter Workflow für effiziente Projektumsetzung
          </p>
        </div>

        <div ref={processRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line for larger screens */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500" />
              )}
              
              <Card className="relative bg-slate-800/50 backdrop-blur border-slate-700 p-6 hover:bg-slate-700/50 transition-all duration-300">
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>

                <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-6">
                  <step.icon className="w-6 h-6 text-cyan-400" />
                </div>

                <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-slate-300 mb-4">{step.description}</p>

                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-slate-300">
                      <ArrowRight className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}