'use client';

import { useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';

const eligible = [
  'Kleine und mittelständische Unternehmen',
  'Veraltete oder keine Website',
  'Sitz in Deutschland',
  'Bereitschaft zur aktiven Mitarbeit',
];

const notEligible = [
  'Große Konzerne',
  'Bereits moderne Website',
  'Reine Landing Pages',
  'Temporäre Projekte',
];

export function Eligibility() {
  const eligibleRef = useRef<HTMLDivElement>(null);
  const notEligibleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (eligibleRef.current) {
      eligibleRef.current.classList.add('slide-in-hidden');
      observer.observe(eligibleRef.current);
    }

    if (notEligibleRef.current) {
      notEligibleRef.current.classList.add('slide-in-hidden');
      (notEligibleRef.current as HTMLElement).style.animationDelay = '0.2s';
      observer.observe(notEligibleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20" id="eligibility">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Wer kann teilnehmen?
          </h2>
          <p className="text-xl text-gray-600">
            Ich suche Unternehmen, die wirklich von einer neuen Website profitieren würden
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div
            ref={eligibleRef}
            className="bg-white rounded-lg p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-green-600">Teilnahme möglich</h3>
            <ul className="space-y-4">
              {eligible.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={notEligibleRef}
            className="bg-white rounded-lg p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-red-600">Nicht teilnahmeberechtigt</h3>
            <ul className="space-y-4">
              {notEligible.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                    <X className="w-4 h-4 text-red-600" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}