import type { Metadata } from 'next';

export const tippgeberMetadata: Metadata = {
  title: 'Als Tippgeber anmelden | Buchmann Digital Empfehlungsprogramm',
  description: 'Werde Tippgeber bei Buchmann Digital und verdiene 5-10% Provision für jede erfolgreiche Empfehlung. Einfache Anmeldung, personalisierter Link, faire Konditionen.',
  keywords: ['Tippgeber', 'Empfehlungsprogramm', 'Provision', 'Webentwicklung', 'Buchmann Digital', 'Partner werden'],
  openGraph: {
    title: 'Als Tippgeber anmelden | Buchmann Digital',
    description: 'Werde Tippgeber und verdiene 5-10% Provision für jede erfolgreiche Empfehlung.',
    type: 'website',
    url: 'https://buchmann.digital/tippgeber',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://buchmann.digital/tippgeber',
  },
};

export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wie viel Provision kann ich als Tippgeber verdienen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Als Tippgeber erhältst du eine attraktive Provision von 5-10% vom Projektwert, abhängig von der Projektgröße. Bei einem durchschnittlichen Projekt von 5.000€ sind das bereits 250-500€ für dich. Die genauen Konditionen besprechen wir gerne persönlich."
      }
    },
    {
      "@type": "Question",
      "name": "Wann und wie erhalte ich meine Provision?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Deine Provision wird ausgezahlt, sobald der empfohlene Kunde sein Projekt erfolgreich gestartet und die erste Rechnung beglichen hat. Die Auszahlung erfolgt per Banküberweisung innerhalb von 14 Tagen nach Projektstart."
      }
    },
    {
      "@type": "Question",
      "name": "Kann ich mehrere Kunden empfehlen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, selbstverständlich! Es gibt keine Begrenzung für die Anzahl der Empfehlungen. Je mehr qualifizierte Kunden du empfiehlst, desto mehr kannst du verdienen. Dein personalisierter Link trackt automatisch alle Empfehlungen."
      }
    },
    {
      "@type": "Question",
      "name": "Was passiert, wenn ein empfohlener Kunde kein Projekt startet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Keine Sorge! Du erhältst nur dann eine Provision, wenn aus der Empfehlung tatsächlich ein bezahltes Projekt entsteht. Es entstehen dir keine Kosten oder Verpflichtungen, wenn eine Empfehlung nicht zum Projektabschluss führt."
      }
    },
    {
      "@type": "Question",
      "name": "Wie kann ich meinen Empfehlungslink am besten teilen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Du kannst deinen Link ganz einfach in persönlichen Gesprächen, E-Mails, WhatsApp-Nachrichten oder sozialen Medien teilen. Am besten funktionieren persönliche Empfehlungen mit einer kurzen Erklärung, warum du Buchmann Digital weiterempfiehlst."
      }
    }
  ]
};

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Buchmann Digital",
  "url": "https://buchmann.digital",
  "description": "Webentwicklung und SEO für Handwerker und regionale Dienstleister",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+49-174-9165008",
    "contactType": "customer service",
    "email": "info@buchmann.digital"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Markstraße 1",
    "addressLocality": "Bad Hindelang",
    "postalCode": "87541",
    "addressCountry": "DE"
  }
}; 