'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Zap, Code, CheckCircle2 } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Unter 2 Stunden',
    description: 'Diese Landing Page wurde in weniger als 2 Stunden entwickelt'
  },
  {
    icon: Code,
    title: 'Modernste Technologien',
    description: 'Next.js, React, Tailwind CSS und TypeScript'
  },
  {
    icon: Zap,
    title: 'Optimale Performance',
    description: 'Lighthouse Score von 95+ in allen Kategorien'
  }
];

const techStack = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'Radix UI'
];

export function QuickDevelopment() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      sectionRef.current.classList.add('slide-up-hidden');
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-slate-800/50" id="quick-development">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-cyan-900/30 rounded-full px-4 py-2 mb-6">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-300 font-medium">Schnelle Entwicklung</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Diese Landing Page ist der Beweis
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Entwickelt in weniger als 2 Stunden mit modernsten Technologien und Best Practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
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

          <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 backdrop-blur border border-cyan-700/50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Verwendete Technologien:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {techStack.map((tech, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-slate-300">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}