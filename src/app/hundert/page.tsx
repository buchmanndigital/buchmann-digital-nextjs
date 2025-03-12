'use client';

import { Navigation } from '@/components/hundert/Navigation';
import { Footer } from '@/components/Footer';
import { ProjectGrid } from '@/components/hundert/ProjectGrid';
import { CustomerList } from '@/components/hundert/CustomerList';
import { ContactForm } from '@/components/hundert/ContactForm';
import { FAQ } from '@/components/hundert/FAQ'; 
import { AboutMe } from '@/components/hundert/AboutMe';
import { motion } from 'framer-motion';

// Typdefinitionen
export interface Project {
  id: number;
  title: string;
  subtitle?: string;
  url?: string;
  icon?: string;
  status: 'abgeschlossen' | 'in-arbeit' | 'geplant' | 'idee' | 'leer';
  filled: boolean; // Neues Flag für gefüllte/nicht gefüllte Projekte
}

export interface Customer {
  name: string;
  industry?: string;
  logo?: string;
}

// Projektdaten - Bereits gefüllte Projekte
const projects: Project[] = [
  {
    id: 1,
    title: "Neue Webseite",
    subtitle: "Fliesen Kamberger",
    url: "https://fliesen-kamberger.de",
    status: "abgeschlossen",
    filled: true
  },
  {
    id: 2,
    title: "Mitarbeiter Kampagne",
    subtitle: "Hiedl",
    url: "https://jobs.hiedl-galabau.de/",
    status: "abgeschlossen",
    filled: true
  },
  {
    id: 3,
    title: "Mitarbeiter Kampagne",
    subtitle: "Wega GmbH",
    url: "https://wega-jobs.de/",
    status: "abgeschlossen",
    filled: true
  },
  {
    id: 4,
    title: "Mitarbeiter Kampagne",
    subtitle: "Holzofenbäckerei Schroth",
    url: "https://jobs.holzofenbaeckerei-schroth.de/",
    status: "abgeschlossen",
    filled: true
  },
  {
    id: 5,
    title: "Nebenprojekt",
    subtitle: "Billanz",
    url: "https://www.billanz.de/",
    status: "abgeschlossen",
    filled: true
  },
  {
    id: 6,
    title: "Webseite",
    subtitle: "Füssener Hausmeisterservice",
    url: "https://hausmeister-fuessen-nextjs.vercel.app/",
    status: "abgeschlossen",
    filled: true
  },
  {
    id: 7,
    title: "Nebenprojekt",
    subtitle: "Jurny",
    url: "https://www.jurny.club/",
    status: "abgeschlossen",
    filled: true
  },
  {
    id: 8,
    title: "Webseite",
    subtitle: "Allgäuer Transport-Taxi",
    url: "https://allgaeuer-transport-taxi.vercel.app/",
    status: "abgeschlossen",
    filled: true
  },
  {
    id: 9,
    title: "App",
    subtitle: "TalkSum",
    url: "https://apps.apple.com/de/app/talksum/id6742714916",
    status: "abgeschlossen",
    filled: true
  },
];

// Projekte auf 100 auffüllen
for (let i = projects.length + 1; i <= 100; i++) {
  const statuses = ['abgeschlossen', 'in-arbeit', 'geplant', 'idee', 'leer'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)] as 'abgeschlossen' | 'in-arbeit' | 'geplant' | 'idee' | 'leer';
  
  projects.push({
    id: i,
    title: `Projekt ${i}`,
    subtitle: `Beschreibung ${i}`,
    url: `/projekte/projekt-${i}`,
    status: randomStatus,
    filled: false
  });
}

// Kundendaten
const customers: Customer[] = [
  {
    name: "Musterfirma GmbH",
    industry: "E-Commerce",
    logo: "/images/customers/musterfirma.svg"
  },
  {
    name: "Beispiel AG",
    industry: "Finanzen",
    logo: "/images/customers/beispiel.svg"
  },
  {
    name: "Tech Solutions",
    industry: "IT",
    logo: "/images/customers/tech-solutions.svg"
  },
  {
    name: "Marketing Plus",
    industry: "Marketing",
    logo: "/images/customers/marketing-plus.svg"
  },
  {
    name: "Design Studio",
    industry: "Kreativ",
    logo: "/images/customers/design-studio.svg"
  },
];

export default function HundertPage() {
  // Funktion zum Scrollen zum FAQ-Bereich
  const scrollToFAQ = () => {
    const faqSection = document.getElementById('faq');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="min-h-screen dark bg-gradient-to-b from-gray-900 to-gray-800 text-gray-50">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Meine 100 Projekte Challenge
            </h1>
            <p className="text-xl text-gray-300">
              Ich bin seit kurzem selbstständiger Software-Entwickler und das ist meine{' '}
              <span 
                className="text-indigo-400 font-medium cursor-pointer hover:underline"
                onClick={scrollToFAQ}
                title="Mehr Informationen in den FAQs"
              >
                100 Projekte Challenge
              </span>
              . Jedes Feld steht für ein Projekt.
            </p>
          </motion.div>

          <ProjectGrid projects={projects} lastUpdated="2025-03-06" />

          <div className="mt-24">
            <CustomerList customers={customers} />
          </div>

          <div className="mt-24">
            <FAQ />
          </div>

          <div className="mt-24">
            <AboutMe />
          </div>

          <div className="mt-24">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}