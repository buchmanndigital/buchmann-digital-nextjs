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
    question: 'Wie lange dauert die Implementierung?',
    answer: 'Die Implementierungszeit variiert je nach Komplexität der Prozesse. Erste Automatisierungen können bereits nach 2-4 Wochen live gehen. Umfangreichere Projekte dauern typischerweise 2-3 Monate.'
  },
  {
    question: 'Welche Prozesse können automatisiert werden?',
    answer: 'Prinzipiell können alle standardisierten, wiederkehrenden Prozesse automatisiert werden. Häufige Beispiele sind Dokumentenmanagement, E-Mail-Verarbeitung, Datenerfassung, Rechnungsverarbeitung und Kundenservice-Prozesse.'
  },
  {
    question: 'Wie hoch sind die Kosten?',
    answer: 'Die Kosten hängen von Umfang und Komplexität der Automatisierung ab. Wir erstellen Ihnen ein individuelles Angebot basierend auf Ihren spezifischen Anforderungen. Die Investition amortisiert sich typischerweise innerhalb von 6-12 Monaten.'
  },
  {
    question: 'Wie werden Mitarbeiter eingebunden?',
    answer: 'Wir legen großen Wert auf Change Management und Mitarbeitereinbindung. Dies umfasst Schulungen, Workshops und kontinuierliche Unterstützung während der Implementierung.'
  },
  {
    question: 'Welche Technologien kommen zum Einsatz?',
    answer: 'Wir setzen auf moderne, bewährte Technologien wie Cloud-Computing, KI/ML, RPA (Robotic Process Automation) und API-Integrationen. Die konkrete Technologieauswahl erfolgt basierend auf Ihren Anforderungen.'
  },
  {
    question: 'Wie sicher sind die automatisierten Prozesse?',
    answer: 'Sicherheit hat höchste Priorität. Wir implementieren modernste Sicherheitsstandards, verschlüsselte Datenübertragung und regelmäßige Backups. Alle Lösungen entsprechen den aktuellen Datenschutzrichtlinien.'
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
    <section className="py-20 bg-gray-50" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Häufig gestellte Fragen
          </h2>
          <p className="text-xl text-gray-600">
            Finden Sie Antworten auf die wichtigsten Fragen zur Digitalisierung
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}