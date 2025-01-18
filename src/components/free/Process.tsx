'use client';

import { useEffect, useRef } from 'react';
import { ClipboardCheck, Sparkles, Rocket } from 'lucide-react';

const steps = [
  {
    icon: ClipboardCheck,
    title: '1. Bewirb dich',
    description: 'Fülle das kurze Bewerbungsformular aus und erzähle uns von deinem Unternehmen.'
  },
  {
    icon: Sparkles,
    title: '2. Gewinne',
    description: 'Der Gewinner wird nach Ablauf der Frist ausgewählt und persönlich benachrichtigt.'
  },
  {
    icon: Rocket,
    title: '3. Durchstarten',
    description: 'Gemeinsam entwickeln wir deine neue Website und bringen dein Business nach vorne.'
  }
];

export function Process() {
  const stepsRef = useRef<HTMLDivElement>(null);

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

    const steps = stepsRef.current?.children;
    if (steps) {
      Array.from(steps).forEach((step, index) => {
        step.classList.add('slide-up-hidden');
        (step as HTMLElement).style.animationDelay = `${index * 0.2}s`;
        observer.observe(step);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-indigo-50" id="process">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            So einfach geht's
          </h2>
          <p className="text-xl text-gray-600">
            In nur drei Schritten zu deiner neuen Website
          </p>
        </div>

        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/4 right-0 w-full h-0.5 bg-indigo-200" />
              )}
              
              <div className="relative bg-white rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}