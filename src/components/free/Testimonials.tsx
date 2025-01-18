'use client';

import { useEffect, useRef } from 'react';
import { TrendingUp, Award, Zap, Target, Users, LineChart } from 'lucide-react';

const metrics = [
  {
    icon: TrendingUp,
    value: '247%',
    label: 'Mehr Anfragen',
    description: 'Durchschnittliche Steigerung der Conversion-Rate'
  },
  {
    icon: Zap,
    value: '0.8s',
    label: 'Schnellere Ladezeit',
    description: 'Optimierte Performance für bessere Rankings'
  },
  {
    icon: Users,
    value: '89%',
    label: 'Mehr Besucher',
    description: 'Steigerung der monatlichen Website-Besucher'
  }
];

const improvements = [
  {
    icon: Target,
    title: 'Zielgerichtete Optimierung',
    description: 'Durch datengetriebene Analysen und A/B-Tests erreichen wir maximale Performance.'
  },
  {
    icon: Award,
    title: 'Beste Technologien',
    description: 'Modernste Frameworks und Tools für optimale Geschwindigkeit und Sicherheit.'
  },
  {
    icon: LineChart,
    title: 'Messbare Ergebnisse',
    description: 'Transparente Erfolgsmessung durch umfassendes Tracking und Reporting.'
  }
];

export function Testimonials() {
  const metricsRef = useRef<HTMLDivElement>(null);
  const improvementsRef = useRef<HTMLDivElement>(null);

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

    const metricsCards = metricsRef.current?.children;
    if (metricsCards) {
      Array.from(metricsCards).forEach((card, index) => {
        card.classList.add('slide-up-hidden');
        (card as HTMLElement).style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
      });
    }

    const improvementsCards = improvementsRef.current?.children;
    if (improvementsCards) {
      Array.from(improvementsCards).forEach((card, index) => {
        card.classList.add('slide-in-hidden');
        (card as HTMLElement).style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bewiesene Resultate
          </h2>
          <p className="text-xl text-gray-600">
            Mit modernsten Technologien und datengetriebener Optimierung zu messbarem Erfolg
          </p>
        </div>

        {/* Metrics Grid */}
        <div ref={metricsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-white rounded-lg p-8 text-center shadow-lg transform group-hover:-translate-y-1 transition-transform duration-300">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <metric.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {metric.value}
                </div>
                <div className="font-semibold text-gray-900 mb-2">
                  {metric.label}
                </div>
                <p className="text-gray-600">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Improvements Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-radial from-indigo-100 to-transparent opacity-50" />
          <div ref={improvementsRef} className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {improvements.map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}