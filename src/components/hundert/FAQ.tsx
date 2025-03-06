'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Script from 'next/script';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: React.ReactNode; // Geändert zu ReactNode, um JSX zu unterstützen
}

const faqItems: FAQItem[] = [
  {
    question: "Was ist die 100 Projekte Challenge?",
    answer: "Die 100 Projekte Challenge ist meine persönliche Challenge als selbstständiger Software-Entwickler, bei der ich mir das Ziel gesetzt habe, 100 verschiedene Projekte zu realisieren. Dabei handelt es sich um bereits abgeschlossene Projekte und Projekte, die ich aktuell umsetze."
  },
  {
    question: "Wie kannst du Teil der Challenge werden?",
    answer: "Du kannst Teil dieser Challenge werden, indem du mir deine Projektidee über das Kontaktformular auf dieser Seite einreichst. Ich prüfe alle Einreichungen und wähle Projekte aus, die in meine 100 Projekte Challenge passen."
  },
  {
    question: "Welche Arten von Projekten kommen in Frage?",
    answer: "Ich bin offen für verschiedenste Projektarten - von Websites und Webapps über Mobile Apps bis hin zu speziellen Software-Lösungen. Besonders interessant sind für mich Projekte, die innovative Technologien nutzen oder kreative Lösungen für reale Probleme bieten."
  },
  {
    question: "Wie lange dauert die Umsetzung eines Projekts?",
    answer: (
      <>
        Die Dauer variiert je nach Komplexität und Umfang des Projekts. Kleinere Projekte können innerhalb{' '}
        <Link href="/fast" className="text-indigo-400 hover:text-indigo-300 hover:underline">
          weniger Tage
        </Link>{' '}
        umgesetzt sein, während komplexere Projekte mehrere Monate in Anspruch nehmen können. Bei der Projektplanung legen wir gemeinsam einen realistischen Zeitrahmen fest.
      </>
    )
  },
  {
    question: "Was kostet die Teilnahme an der Challenge?",
    answer: "Die Kosten hängen vom jeweiligen Projekt ab. Einige besonders innovative oder gemeinnützige Projekte können zu reduzierten Konditionen oder sogar pro bono umgesetzt werden. Für kommerzielle Projekte erstelle ich ein individuelles, transparentes Angebot nach einer detaillierten Anforderungsanalyse."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Strukturierte Daten für Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item, index) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof item.answer === 'string' 
          ? item.answer 
          : "Die Dauer variiert je nach Komplexität und Umfang des Projekts. Kleinere Projekte können innerhalb weniger Tage umgesetzt sein, während komplexere Projekte mehrere Monate in Anspruch nehmen können."
      }
    }))
  };

  const toggleQuestion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="py-16" id="faq">
      {/* Strukturierte Daten als JSON-LD */}
      <Script 
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Häufig gestellte Fragen
          </h2>
          <p className="text-lg text-gray-300">
            Hier findest du Antworten auf die häufigsten Fragen zur 100 Projekte Challenge
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  className="flex justify-between items-center w-full p-5 text-left"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-medium text-white">{item.question}</h3>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${openIndex === index ? 'transform rotate-180' : ''}`}
                  />
                </button>
                
                <div 
                  id={`faq-answer-${index}`}
                  className={`px-5 pb-5 ${openIndex === index ? 'block' : 'hidden'}`}
                >
                  <div className="text-gray-300">
                    {item.answer}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}