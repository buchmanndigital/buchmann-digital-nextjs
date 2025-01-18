"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";

const faqs = [
  {
    question: "Wie wird der Gewinner ausgewählt?",
    answer: "Der Gewinner wird nach verschiedenen Kriterien ausgewählt, darunter das Potential für Verbesserungen, die Motivation des Unternehmens und die Machbarkeit des Projekts im gegebenen Zeitrahmen."
  },
  {
    question: "Was ist im Gewinn enthalten?",
    answer: "Der Gewinner erhält ein komplettes Website-Redesign im Wert von 5.000 €, inklusive Beratung, Design, Entwicklung, SEO-Optimierung und Einrichtung von Analytics-Tools."
  },
  {
    question: "Wie lange dauert die Umsetzung?",
    answer: "Die Umsetzung dauert in der Regel 4-6 Wochen, abhängig vom Umfang des Projekts und der Komplexität der Anforderungen."
  },
  {
    question: "Gibt es versteckte Kosten?",
    answer: "Nein, der Gewinner erhält das komplette Paket kostenlos. Lediglich laufende Kosten wie Hosting und Domain müssen selbst getragen werden."
  },
  {
    question: "Was passiert, wenn ich nicht gewinne?",
    answer: "Alle Teilnehmer erhalten eine persönliche Einschätzung ihrer aktuellen Website und Verbesserungsvorschläge. Zudem biete ich allen Teilnehmern einen Sonderrabatt für meine Dienstleistungen an."
  }
];

export function FAQ() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
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
    <section className="py-20" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Häufig gestellte Fragen
          </h2>
          <p className="text-xl text-gray-600">
            Hier findest du Antworten auf die häufigsten Fragen zu unserem Gewinnspiel.
          </p>
        </div>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}