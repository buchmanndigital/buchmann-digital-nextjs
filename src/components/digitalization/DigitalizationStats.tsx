'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Clock, 
  TrendingUp, 
  Users, 
  Zap,
  ArrowRight,
  CheckCircle2,
  LineChart
} from 'lucide-react';

const stats = [
  {
    title: 'Zeitersparnis',
    value: '70%',
    description: 'weniger Zeit für manuelle Aufgaben',
    icon: Clock,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Kosteneinsparung',
    value: '30%',
    description: 'reduzierte Betriebskosten',
    icon: TrendingUp,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    title: 'Mitarbeiterzufriedenheit',
    value: '85%',
    description: 'höhere Zufriedenheit',
    icon: Users,
    color: 'from-green-500 to-emerald-500'
  }
];

const benefits = [
  {
    title: 'Schnellere Prozesse',
    metrics: [
      { label: 'Durchlaufzeit', before: '48h', after: '4h' },
      { label: 'Bearbeitungszeit', before: '30min', after: '5min' },
      { label: 'Reaktionszeit', before: '24h', after: '1h' }
    ]
  },
  {
    title: 'Bessere Qualität',
    metrics: [
      { label: 'Fehlerquote', before: '12%', after: '0.5%' },
      { label: 'Kundenzufriedenheit', before: '75%', after: '95%' },
      { label: 'Prozessgenauigkeit', before: '85%', after: '99.9%' }
    ]
  }
];

export function DigitalizationStats() {
  const statsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

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

    if (statsRef.current) {
      statsRef.current.classList.add('slide-up-hidden');
      observer.observe(statsRef.current);
    }

    if (benefitsRef.current) {
      benefitsRef.current.classList.add('slide-up-hidden');
      observer.observe(benefitsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-900/50 rounded-full px-4 py-2 mb-6">
            <LineChart className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-medium">Messbare Ergebnisse</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Weitere Vorteile der Digitalisierung
          </h2>
          <p className="text-xl text-gray-300">
            Entdecken Sie, wie Prozessautomatisierung Ihr Unternehmen transformiert
          </p>
        </div>

        {/* Key Statistics */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-lg transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100`} />
              <Card className="relative bg-gray-800/50 backdrop-blur border-gray-700 p-8 text-center h-full">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-blue-900/50 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-xl font-semibold text-gray-300 mb-2">{stat.title}</div>
                <p className="text-gray-400">{stat.description}</p>
              </Card>
            </div>
          ))}
        </div>

        {/* Detailed Benefits */}
        <div ref={benefitsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-gray-800/50 backdrop-blur border-gray-700 p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-blue-400" />
                {benefit.title}
              </h3>
              <div className="space-y-4">
                {benefit.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="flex items-center justify-between">
                    <span className="text-gray-400">{metric.label}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500">{metric.before}</span>
                      <ArrowRight className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 font-bold">{metric.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}