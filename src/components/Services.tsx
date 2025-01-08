'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Code2, Laptop, PenTool, MessageSquare } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Laptop,
      title: 'Webentwicklung',
      description: 'Maßgeschneiderte Websites und Webanwendungen für Ihr Unternehmen.'
    },
    {
      icon: Code2,
      title: 'Softwareentwicklung',
      description: 'Individuelle Softwarelösungen für Ihre geschäftlichen Anforderungen.'
    },
    {
      icon: PenTool,
      title: 'UX/UI Design',
      description: 'Benutzerfreundliche und ästhetische Designlösungen.'
    },
    {
      icon: MessageSquare,
      title: 'IT-Beratung',
      description: 'Professionelle Beratung für Ihre digitale Transformation.'
    }
  ];

  const cardsRef = useRef<HTMLDivElement>(null);

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

    const cards = cardsRef.current?.children;
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
    <section className="py-20" id="services">
      <h2 className="text-4xl font-bold text-center mb-12">Meine Dienstleistungen</h2>
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="p-6">
            <service.icon className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}