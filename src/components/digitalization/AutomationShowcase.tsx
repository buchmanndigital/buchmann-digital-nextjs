'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { 
  FileText, 
  Mail, 
  Calendar, 
  MessageSquare,
  FileSpreadsheet,
  Users
} from 'lucide-react';

const automations = [
  {
    icon: FileText,
    title: 'Dokumentenmanagement',
    description: 'Automatische Erfassung, Kategorisierung und Archivierung von Dokumenten mit KI-Unterstützung.',
    benefits: ['90% weniger Suchzeit', 'Zentrale Ablage', 'Automatische Verschlagwortung']
  },
  {
    icon: Mail,
    title: 'E-Mail-Verarbeitung',
    description: 'Intelligente E-Mail-Sortierung und automatische Bearbeitung von Standardanfragen.',
    benefits: ['24/7 Verfügbarkeit', 'Schnelle Reaktionszeiten', 'Reduzierte Fehlerquote']
  },
  {
    icon: Calendar,
    title: 'Terminmanagement',
    description: 'Automatische Terminkoordination und Ressourcenplanung für effizientere Abläufe.',
    benefits: ['Keine Terminüberschneidungen', 'Automatische Erinnerungen', 'Optimierte Auslastung']
  },
  {
    icon: MessageSquare,
    title: 'Kundenservice',
    description: 'KI-gestützter Support mit automatischen Antworten auf häufige Fragen.',
    benefits: ['24/7 Erreichbarkeit', 'Schnelle Antwortzeiten', 'Entlastung der Mitarbeiter']
  },
  {
    icon: FileSpreadsheet,
    title: 'Datenverarbeitung',
    description: 'Automatische Datenerfassung und -verarbeitung aus verschiedenen Quellen.',
    benefits: ['Keine manuellen Eingaben', 'Reduzierte Fehlerquote', 'Echtzeitauswertungen']
  },
  {
    icon: Users,
    title: 'HR-Prozesse',
    description: 'Digitalisierte Bewerbungsprozesse und automatisierte Personalverwaltung.',
    benefits: ['Schnellere Einstellungen', 'Papierlose Verwaltung', 'Effizientes Onboarding']
  }
];

export function AutomationShowcase() {
  const showcaseRef = useRef<HTMLDivElement>(null);

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

    const cards = showcaseRef.current?.children;
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
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" id="showcase">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 break-word">
            Automatisierungsmöglichkeiten
          </h2>
          <p className="text-xl text-gray-600">
            Entdecken Sie die vielfältigen Möglichkeiten der Prozessautomatisierung
          </p>
        </div>

        <div ref={showcaseRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {automations.map((automation, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <automation.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{automation.title}</h3>
              <p className="text-gray-600 mb-4">{automation.description}</p>
              <ul className="space-y-2">
                {automation.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                    {benefit}
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