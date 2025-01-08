'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqData = [
  {
    question: 'Welche Technologien verwenden Sie für Ihre Projekte?',
    answer: 'Ich arbeite mit modernen Webtechnologien wie React, Next.js, TypeScript und Node.js. Für jeden Kunden wähle ich die optimale Technologie basierend auf den spezifischen Anforderungen.'
  },
  {
    question: 'Wie lange dauert die Entwicklung einer Website?',
    answer: 'Die Entwicklungszeit variiert je nach Komplexität des Projekts. Eine einfache Website kann in 2-4 Wochen fertiggestellt sein, während komplexere Projekte 2-3 Monate benötigen können.'
  },
  {
    question: 'Bieten Sie auch Wartung und Support nach der Fertigstellung an?',
    answer: 'Ja, ich biete verschiedene Wartungspakete an, die regelmäßige Updates, Sicherheits-Patches und technischen Support umfassen.'
  },
  {
    question: 'Wie läuft der typische Entwicklungsprozess ab?',
    answer: 'Der Prozess beginnt mit einer detaillierten Anforderungsanalyse, gefolgt von Design, Entwicklung, Testing und Launch. Sie werden in jeder Phase eng eingebunden und erhalten regelmäßige Updates.'
  },
  {
    question: 'Können bestehende Websites modernisiert werden?',
    answer: 'Ja, ich biete Redesign und Modernisierung bestehender Websites an. Dabei wird die Website technisch und optisch auf den neuesten Stand gebracht.'
  },
  {
    question: 'Was kostet die Entwicklung einer Website?',
    answer: 'Die Kosten hängen von den spezifischen Anforderungen ab. Ich erstelle Ihnen gerne ein individuelles Angebot basierend auf Ihren Bedürfnissen.'
  }
];

export function FAQ() {
  return (
    <section className="py-20" id="faq">
      <h2 className="text-4xl font-bold text-center mb-12">Häufig gestellte Fragen</h2>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Structured Data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': faqData.map(item => ({
              '@type': 'Question',
              'name': item.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': item.answer
              }
            }))
          })
        }}
      />
    </section>
  );
}