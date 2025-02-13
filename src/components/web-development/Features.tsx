'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Smartphone, 
  Search, 
  Zap, 
  Shield,
  Code,
  LineChart,
  Database,
  Sparkles,
  FileCode,
  Server,
  Lock
} from 'lucide-react';

const features = [
  {
    icon: Code,
    title: 'Next.js & React',
    description: 'Modernste Technologien für optimale Performance, SEO und Entwicklungsgeschwindigkeit.',
    benefits: [
      'Server-Side Rendering',
      'Optimierte Performance',
      'Besseres SEO-Ranking',
      'Schnellere Entwicklung'
    ]
  },
  {
    icon: FileCode,
    title: 'Vollständige Code-Übergabe',
    description: 'Der komplette Quellcode gehört Ihrer Agentur und kann beliebig weiterentwickelt werden.',
    benefits: [
      'Voller Zugriff auf den Code',
      'Keine Vendor Lock-in',
      'Freie Weiterentwicklung',
      'Dokumentierter Code'
    ]
  },
  {
    icon: Database,
    title: 'Headless CMS',
    description: 'Optional: Flexibles Content Management mit modernen Headless CMS-Lösungen.',
    benefits: [
      'Einfache Content-Pflege',
      'API-basierte Architektur',
      'Maximale Flexibilität',
      'Skalierbare Lösung'
    ]
  }
];

const additionalFeatures = [
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Responsive Design mit Fokus auf mobile Endgeräte für optimale Nutzererfahrung.'
  },
  {
    icon: Search,
    title: 'SEO-Optimiert',
    description: 'Technisch saubere Umsetzung mit Fokus auf Suchmaschinenoptimierung.'
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Schnelle Ladezeiten durch optimierte Assets und moderne Web-Technologien.'
  },
  {
    icon: Shield,
    title: 'Sicherheit',
    description: 'Implementierung aktueller Sicherheitsstandards und Best Practices.'
  },
  {
    icon: LineChart,
    title: 'Analytics',
    description: 'Integration von Tracking-Tools für messbare Ergebnisse.'
  },
  {
    icon: Sparkles,
    title: 'Testprojekt möglich',
    description: 'Starten Sie risikofrei mit einem Testprojekt - Zahlung nur bei Zufriedenheit.'
  }
];

const hostingFeatures = [
  {
    icon: Server,
    title: 'Flexibles Hosting',
    description: 'Hosting-Setup nach Ihren Wünschen - von Vercel bis zu Ihrem eigenen Server.'
  },
  {
    icon: Lock,
    title: 'Volle Kontrolle',
    description: 'Sie behalten die volle Kontrolle über Hosting und Domains.'
  }
];

export function Features() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const nextjsRef = useRef<HTMLDivElement>(null);
  const hostingRef = useRef<HTMLDivElement>(null);

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

    const cards = featuresRef.current?.children;
    if (cards) {
      Array.from(cards).forEach((card, index) => {
        card.classList.add('slide-up-hidden');
        (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
      });
    }

    if (nextjsRef.current) {
      nextjsRef.current.classList.add('slide-up-hidden');
      observer.observe(nextjsRef.current);
    }

    if (hostingRef.current) {
      hostingRef.current.classList.add('slide-up-hidden');
      observer.observe(hostingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-slate-800/50" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Technische Features
          </h2>
          <p className="text-xl text-slate-300">
            Moderne Technologien und Best Practices für optimale Ergebnisse
          </p>
        </div>

        {/* Highlighted Features */}
        <div ref={nextjsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-8 bg-slate-900/50 backdrop-blur border-slate-700 hover:bg-slate-800/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-300 mb-6">{feature.description}</p>
              {feature.benefits && (
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-slate-300">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>

        {/* Hosting Features */}
        <div ref={hostingRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {hostingFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 bg-slate-900/50 backdrop-blur border-slate-700 hover:bg-slate-800/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {additionalFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 bg-slate-900/50 backdrop-blur border-slate-700 hover:bg-slate-800/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}