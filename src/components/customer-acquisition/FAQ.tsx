'use client';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useEffect } from 'react';

const faqs = [
  {
    question: "Was ist eine Landingpage?",
    answer: "Eine Landingpage ist eine speziell gestaltete Webseite, die auf ein bestimmtes Ziel ausgerichtet ist - zum Beispiel die Gewinnung von Neukunden. Im Gegensatz zu einer normalen Website konzentriert sich eine Landingpage auf eine klare Handlungsaufforderung und enthält nur die wichtigsten Informationen."
  },
  {
    question: "Wie funktioniert Online-Werbung?",
    answer: "Online-Werbung ermöglicht es, Ihre Zielgruppe genau dort zu erreichen, wo sie nach Ihren Produkten oder Dienstleistungen sucht. Bei Google Ads werden Ihre Anzeigen angezeigt, wenn potenzielle Kunden nach bestimmten Suchbegriffen suchen. Bei Social Media Werbung kann ich Ihre Anzeigen nach Interessen, Region und anderen Merkmalen ausrichten."
  },
  {
    question: "Wie lange dauert es, bis ich erste Ergebnisse sehe?",
    answer: "Die ersten Ergebnisse sind meist nach 2-4 Wochen sichtbar. Google Ads können sofort Traffic generieren, während SEO-Maßnahmen etwa 3-6 Monate brauchen, um ihre volle Wirkung zu entfalten. Ich beobachte die Entwicklung kontinuierlich und optimieren die Maßnahmen entsprechend."
  },
  {
    question: "Warum sollte ich in Online-Marketing investieren?",
    answer: "Im Allgäu suchen immer mehr Menschen online nach lokalen Dienstleistern und Produkten. Mit professionellem Online-Marketing erreichen Sie diese potenziellen Kunden genau dann, wenn sie nach Ihren Leistungen suchen. Dies führt zu qualifizierten Anfragen und einem besseren Return on Investment im Vergleich zu klassischer Werbung."
  },
  {
    question: "Wie grenzen Sie sich von anderen Agenturen ab?",
    answer: "Als lokaler Anbieter kenne ich die Besonderheiten des Allgäuer Marktes und Ihrer Zielgruppe. Ich biete einen persönlichen Service mit regelmäßigen Vor-Ort-Terminen und spreche die Sprache Ihrer Kunden. Zudem setze ich auf nachhaltige Strategien statt kurzfristiger Erfolge."
  },
  {
    question: "Gibt es eine Mindestvertragslaufzeit?",
    answer: "Für Website-Projekte gibt es keine Mindestlaufzeit - Sie zahlen einmalig für die Entwicklung. Bei Online-Marketing Kampagnen empfehle ich mindestens 3 Monate, um aussagekräftige Daten zu sammeln und die Kampagnen optimal zu optimieren. Ich biete aber flexible Verträge ohne lange Bindung."
  }
];

export function FAQ() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
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
            Hier finden Sie Antworten auf die wichtigsten Fragen zur Kundengewinnung
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}