'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useEffect } from 'react';

const faqs = [
  {
    question: "Wie lange dauert die Umsetzung eines typischen Projekts?",
    answer: "Die meisten Projekte werden innerhalb von 3-5 Arbeitstagen umgesetzt. Der genaue Zeitrahmen hängt von der Komplexität und dem Umfang des Projekts ab. Durch optimierte Prozesse und jahrelange Erfahrung können wir auch umfangreichere Projekte schnell und effizient realisieren."
  },
  {
    question: "Wie läuft die Zusammenarbeit konkret ab?",
    answer: "Nach dem initialen Briefing erhalten Sie einen klaren Zeitplan. Während der Entwicklung haben Sie Zugriff auf eine Vorschau-Umgebung und können den Fortschritt in Echtzeit verfolgen. Die Kommunikation erfolgt direkt und unkompliziert, Feedback wird umgehend umgesetzt."
  },
  {
    question: "Welche Technologien kommen zum Einsatz?",
    answer: "Wir setzen auf moderne Frameworks wie Next.js, React und Tailwind CSS. Diese ermöglichen nicht nur eine schnelle Entwicklung, sondern bieten auch optimale Performance und einfache Wartbarkeit. Alle Projekte werden nach aktuellen Best Practices und Web-Standards entwickelt."
  },
  {
    question: "Wie funktioniert das White-Label-Angebot?",
    answer: "Die Website wird komplett unter Ihrem Branding entwickelt. In der Kommunikation mit Ihren Kunden treten wir nicht in Erscheinung. Sie können die fertige Website als Ihre eigene Entwicklung präsentieren und behalten die volle Kontrolle über die Kundenbeziehung."
  },
  {
    question: "Was ist im Leistungsumfang enthalten?",
    answer: "Der Service umfasst die komplette technische Umsetzung: Von der Entwicklung über SEO-Optimierung bis zum Deployment. Inklusive sind auch grundlegende Performance-Optimierungen, Cross-Browser-Tests und eine mobile-first Implementierung."
  },
  {
    question: "Wie werden Änderungswünsche gehandhabt?",
    answer: "Während der Entwicklung können Änderungen flexibel eingebracht werden. Nach Projektabschluss bieten wir optional Support-Pakete an. Für langfristige Partnerschaften gibt es spezielle Wartungsvereinbarungen mit garantierten Reaktionszeiten."
  }
];

export function FAQ() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section className="py-20 bg-slate-800/50" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Häufig gestellte Fragen
          </h2>
          <p className="text-xl text-slate-300">
            Antworten auf die wichtigsten Fragen zur Zusammenarbeit
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="bg-slate-900/50 backdrop-blur border border-slate-700 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-white hover:text-cyan-400 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-slate-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}