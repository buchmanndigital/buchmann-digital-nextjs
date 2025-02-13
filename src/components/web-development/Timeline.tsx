'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const timelineSteps = [
  {
    day: 'Tag 1',
    title: 'Projektstart & Setup',
    tasks: [
      'Projektbriefing & Anforderungsanalyse',
      'Technisches Setup & Grundstruktur',
      'Erste Entwicklungsschritte'
    ]
  },
  {
    day: 'Tag 2-3',
    title: 'Hauptentwicklung',
    tasks: [
      'Umsetzung des Designs',
      'Integration aller Features',
      'Responsive Optimierung'
    ]
  },
  {
    day: 'Tag 4',
    title: 'Optimierung',
    tasks: [
      'Performance-Optimierung',
      'SEO-Feintuning',
      'Interne Tests'
    ]
  },
  {
    day: 'Tag 5',
    title: 'Finalisierung',
    tasks: [
      'Kundenreview',
      'Finale Anpassungen',
      'Deployment & Launch'
    ]
  }
];

export function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

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

    if (timelineRef.current) {
      timelineRef.current.classList.add('slide-up-hidden');
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 relative overflow-hidden" id="timeline">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-900/30 rounded-full px-4 py-2 mb-6">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 font-medium">Schnelle Umsetzung</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Von der Idee zur fertigen Website
          </h2>
          <p className="text-xl text-slate-300">
            Ein strukturierter Prozess für effiziente Projektumsetzung
          </p>
        </div>

        <div 
          ref={timelineRef}
          className="max-w-4xl mx-auto relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full" />

          {timelineSteps.map((step, index) => (
            <div key={index} className={`relative mb-12 ${
              index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'
            }`}>
              <div className={`flex items-start gap-8 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}>
                {/* Timeline Point */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 bg-cyan-500 rounded-full border-4 border-slate-900" />
                </div>

                {/* Content */}
                <div className="w-full md:w-[calc(50%-2rem)] bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700">
                  <div className="text-cyan-400 font-bold mb-2">{step.day}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <ul className="space-y-2">
                    {step.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-center text-slate-300">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}