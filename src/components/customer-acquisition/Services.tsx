'use client';

import { Card } from '@/components/ui/card';
import { Globe, Megaphone, BarChart } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Professionelle Website',
    description: 'Eine moderne Website ist Ihre digitale Visitenkarte. Ich erstelle für Sie einen überzeugenden Webauftritt, der Ihre Zielgruppe anspricht und zum Handeln bewegt.',
    features: [
      'Modernes, responsives Design',
      'Optimiert für Suchmaschinen',
      'Überzeugende Texte und Bilder',
      'Schnelle Ladezeiten'
    ]
  },
  {
    icon: Megaphone,
    title: 'Online-Werbung',
    description: 'Mit gezielter Werbung erreiche ich genau die Menschen, die nach Ihren Produkten oder Dienstleistungen suchen.',
    features: [
      'Google Ads Kampagnen',
      'Social Media Werbung',
      'Regionale Zielgruppen-Ausrichtung',
      'Kontinuierliche Optimierung'
    ]
  },
  {
    icon: BarChart,
    title: 'Analyse & Optimierung',
    description: 'Ich überwache den Erfolg Ihrer Maßnahmen und optimiere sie kontinuierlich für beste Ergebnisse.',
    features: [
      'Monatliche Auswertungen',
      'Conversion-Tracking',
      'A/B-Tests',
      'Transparente Berichterstattung'
    ]
  }
];

export function Services() {
  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Meine Leistungen für Ihren Erfolg
          </h2>
          <p className="text-xl text-gray-600">
            Ein ganzheitlicher Ansatz für nachhaltige Kundengewinnung
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    {feature}
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