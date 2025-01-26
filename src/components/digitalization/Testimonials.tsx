'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    company: 'Schreinerei Müller GmbH',
    person: 'Thomas Müller',
    role: 'Geschäftsführer',
    quote: 'Die Digitalisierung unserer Auftragsabwicklung hat unsere Effizienz um 40% gesteigert. Ein echter Gamechanger für unser Unternehmen!',
    image: 'https://images.unsplash.com/photo-1622675363311-3e1904dc1885?auto=format&fit=crop&q=80&w=800&h=500'
  },
  {
    company: 'Autohaus Schmidt',
    person: 'Sarah Schmidt',
    role: 'Betriebsleiterin',
    quote: 'Dank der automatisierten Prozesse sparen wir täglich mehrere Stunden bei der Terminplanung und Kundenbetreuung.',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800&h=500'
  },
  {
    company: 'Logistik Plus',
    person: 'Michael Weber',
    role: 'IT-Leiter',
    quote: 'Die Integration der KI-gestützten Routenplanung hat unsere Lieferzeiten um 30% verkürzt und die Kosten deutlich gesenkt.',
    image: 'https://images.unsplash.com/photo-1566731316717-38d2b5128521?auto=format&fit=crop&q=80&w=800&h=500'
  }
];

export function Testimonials() {
  const testimonialsRef = useRef<HTMLDivElement>(null);

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

    const cards = testimonialsRef.current?.children;
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
    <section className="py-20" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Das sagen unsere Kunden
          </h2>
          <p className="text-xl text-gray-600">
            Erfahren Sie, wie andere Unternehmen von der Digitalisierung profitieren
          </p>
        </div>

        <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative w-full h-48">
                <img
                  src={testimonial.image}
                  alt={testimonial.company}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <div className="border-t pt-4">
                  <p className="font-bold">{testimonial.person}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-blue-600">{testimonial.company}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}