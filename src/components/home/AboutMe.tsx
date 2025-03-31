'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Script from 'next/script';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const stats = [
  { number: "100+", label: "Projekte abgeschlossen" },
  { number: "10+", label: "Jahre Erfahrung" }
];

const accordionItems = [
  {
    title: "Digitale Transformation",
    content: "Ich begleite dein Unternehmen auf dem Weg in die digitale Zukunft. Mit maßgeschneiderten Lösungen optimieren wir deine Prozesse und erschließen neue Geschäftsmöglichkeiten."
  },
  {
    title: "Webentwicklung & Design",
    content: "Von der ersten Idee bis zur fertigen Website - ich entwickle moderne, benutzerfreundliche Webauftritte, die deine Zielgruppe begeistern und zu mehr Conversions führen."
  },
  {
    title: "Digitales Marketing",
    content: "Mit durchdachten Marketing-Strategien und optimierten Kampagnen steigern wir deine Online-Sichtbarkeit und gewinnen qualifizierte Leads für dein Unternehmen."
  },
  {
    title: "Langfristige Betreuung",
    content: "Nach dem Launch lasse ich dich nicht allein. Ich stehe dir als verlässlicher Partner zur Seite und sorge dafür, dass deine digitale Präsenz kontinuierlich wächst."
  }
];

export function AboutMe() {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Florian Buchmann",
    "jobTitle": "Digital Consultant & Webentwickler",
    "description": "Mit über 10 Jahren Erfahrung und mehr als 100 erfolgreichen Projekten helfe ich Unternehmen bei ihrer digitalen Transformation.",
    "knowsAbout": [
      "Digitale Transformation",
      "Webentwicklung",
      "Digitales Marketing",
      "UI/UX Design"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "25 Branchenauszeichnungen"
      }
    ]
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": accordionItems.map(item => ({
      "@type": "Question",
      "name": item.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.content
      }
    }))
  };

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {
      "@type": "Person",
      "name": "Florian Buchmann"
    },
    "serviceType": "Digital Consulting",
    "areaServed": "DE",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "itemListElement": accordionItems.map((item, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": item.title,
          "description": item.content
        }
      }))
    }
  };

  return (
    <>
      <Script id="person-structured-data" type="application/ld+json">
        {JSON.stringify(personStructuredData)}
      </Script>
      <Script id="faq-structured-data" type="application/ld+json">
        {JSON.stringify(faqStructuredData)}
      </Script>
      <Script id="service-structured-data" type="application/ld+json">
        {JSON.stringify(serviceStructuredData)}
      </Script>
      <section className="py-32 md:py-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="lg:sticky lg:top-24"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Wir kümmern uns um dein digitales Wachstum
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Mit über 10 Jahren Erfahrung und mehr als 100 erfolgreichen Projekten 
                helfe ich dir dabei, dein Unternehmen digital nach vorne zu bringen.
              </p>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden bg-blue-50">
                  <Image
                    src="/images/florian-buchmann.jpg"
                    alt="Florian Buchmann"
                    width={600}
                    height={600}
                    className="object-cover"
                    priority
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute lg:-right-6 right-4 top-1/2 transform -translate-y-1/2 bg-sky-50/90 backdrop-blur-sm lg:p-8 p-4 rounded-xl shadow-lg border border-sky-100/50 max-w-[180px] lg:max-w-none"
                >
                  <div className="space-y-4 lg:space-y-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl lg:text-4xl font-bold text-gray-900 mb-1">
                          {stat.number}
                        </div>
                        <div className="text-xs lg:text-sm text-gray-600 whitespace-nowrap">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="space-y-4 relative"
            >
              {/* 3D Figur */}
              <div className="absolute -right-4 top-0 w-[120px] pointer-events-none z-10 translate-y-[-50%]">
                <Image
                  src="/images/home/florian-buchmann-3d-sitting-down.png"
                  alt="Florian Buchmann 3D"
                  width={120}
                  height={120}
                  className="object-contain"
                  priority
                />
              </div>

              {accordionItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenItem(openItem === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                    aria-expanded={openItem === index}
                    aria-controls={`accordion-content-${index}`}
                  >
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        openItem === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openItem === index && (
                    <motion.div
                      id={`accordion-content-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-gray-600">
                        {item.content}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
} 