'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Users, 
  Briefcase, 
  MessageSquare, 
  FileCode,
  ArrowRight,
  Handshake,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const collaborationTypes = [
  {
    icon: Briefcase,
    title: 'Direkte Umsetzung',
    description: 'Komplette technische Realisierung von Kundenprojekten',
    features: [
      'Schnelle Umsetzung in 3-5 Tagen',
      'Transparente Kommunikation',
      'Feste Ansprechpartner',
      'Klare Prozesse'
    ]
  },
  {
    icon: Users,
    title: 'White-Label-Partnerschaft',
    description: 'Langfristige Zusammenarbeit unter Ihrem Branding',
    features: [
      'Ihr Branding, nicht meins',
      'Flexible Kapazitäten',
      'Garantierte Verfügbarkeit',
      'Spezielle Partnerkonditionen'
    ]
  }
];

const benefits = [
  {
    icon: MessageSquare,
    title: 'Direkte Kommunikation',
    description: 'Klare und schnelle Abstimmung ohne Umwege'
  },
  {
    icon: FileCode,
    title: 'Code-Übergabe',
    description: 'Vollständiger Zugriff auf den Quellcode'
  },
  {
    icon: Handshake,
    title: 'Flexible Zusammenarbeit',
    description: 'Anpassbar an Ihre Bedürfnisse und Prozesse'
  }
];

export function Collaboration() {
  const collaborationRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const testProjectRef = useRef<HTMLDivElement>(null);

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

    if (collaborationRef.current) {
      collaborationRef.current.classList.add('slide-up-hidden');
      observer.observe(collaborationRef.current);
    }

    if (benefitsRef.current) {
      benefitsRef.current.classList.add('slide-up-hidden');
      observer.observe(benefitsRef.current);
    }

    if (testProjectRef.current) {
      testProjectRef.current.classList.add('slide-up-hidden');
      observer.observe(testProjectRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-slate-800/50" id="collaboration">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-900/30 rounded-full px-4 py-2 mb-6">
            <Users className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 font-medium">Zusammenarbeit</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Flexible Modelle der Zusammenarbeit
          </h2>
          <p className="text-xl text-slate-300">
            Wählen Sie die Form der Zusammenarbeit, die am besten zu Ihrer Agentur passt
          </p>
        </div>

        {/* Test Project Offer */}
        <div 
          ref={testProjectRef}
          className="max-w-3xl mx-auto mb-16"
        >
          <Card className="p-8 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 backdrop-blur border-cyan-700/50">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-white">Starten Sie mit einem Testprojekt</h3>
                <p className="text-slate-300 mb-4">
                  Überzeugen Sie sich von der Qualität unserer Arbeit ohne Risiko. Bezahlen Sie erst, wenn Sie und Ihr Kunde vollständig zufrieden sind.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mr-2 flex-shrink-0" />
                    Keine Vorauszahlung erforderlich
                  </li>
                  <li className="flex items-center text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mr-2 flex-shrink-0" />
                    Zahlung nur bei Zufriedenheit
                  </li>
                  <li className="flex items-center text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mr-2 flex-shrink-0" />
                    Volle Unterstützung während des gesamten Prozesses
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Collaboration Types */}
        <div 
          ref={collaborationRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {collaborationTypes.map((type, index) => (
            <Card 
              key={index}
              className="p-8 bg-slate-900/50 backdrop-blur border-slate-700 hover:bg-slate-800/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-6">
                <type.icon className="w-6 h-6 text-cyan-400" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white">{type.title}</h3>
              <p className="text-slate-300 mb-6">{type.description}</p>
              
              <ul className="space-y-3">
                {type.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-slate-300">
                    <ArrowRight className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Additional Benefits */}
        <div 
          ref={benefitsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="p-6 bg-slate-900/50 backdrop-blur border-slate-700 hover:bg-slate-800/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
              <p className="text-slate-300">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}