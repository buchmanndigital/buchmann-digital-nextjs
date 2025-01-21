"use client";

import { useEffect, useState } from 'react';
import { Search, MousePointer, Instagram, TrendingUp, Target, Users } from 'lucide-react';

type TrafficSource = 'organic' | 'google-ads' | 'instagram' | 'unknown';

const sourceContent = {
  'organic': {
    icon: Search,
    title: 'SEO funktioniert!',
    subtitle: 'Sie haben mich über Google gefunden',
    description: 'Sie haben nach professioneller Kundengewinnung im Allgäu gesucht und mich in den organischen Suchergebnissen gefunden. Genau so können auch Ihre potenziellen Kunden Sie finden.',
    stats: [
      { value: '80%', label: 'der Kunden suchen lokal auf Google' },
      { value: 'Top 3', label: 'Platzierung für wichtige Keywords' }
    ]
  },
  'google-ads': {
    icon: MousePointer,
    title: 'Google Ads wirkt!',
    subtitle: 'Sie haben auf meine Google Anzeige geklickt',
    description: 'Diese Anzeige hat Sie zu meiner Website geführt. Mit der gleichen Strategie können wir auch Ihre Wunschkunden gezielt erreichen und von Ihrem Angebot überzeugen.',
    stats: [
      { value: '250%', label: 'mehr qualifizierte Leads' },
      { value: '180%', label: 'höhere Conversion-Rate' }
    ]
  },
  'instagram': {
    icon: Instagram,
    title: 'Social Media überzeugt!',
    subtitle: 'Sie kommen von Instagram zu mir',
    description: 'Meine Instagram-Werbung hat Sie angesprochen. Lassen Sie uns gemeinsam auch Ihre Zielgruppe in den sozialen Medien begeistern und zu Kunden machen.',
    stats: [
      { value: '320%', label: 'mehr Social Media Reichweite' },
      { value: '200%', label: 'höheres Brand Engagement' }
    ]
  },
  'unknown': {
    icon: Target,
    title: 'Online-Marketing wirkt!',
    subtitle: 'Sie sind auf mich aufmerksam geworden',
    description: 'Durch gezielte Online-Marketing-Maßnahmen habe ich Sie als Besucher gewonnen. Genau so können wir auch Ihre Wunschkunden von Ihrem Angebot überzeugen.',
    stats: [
      { value: '200%', label: 'mehr Website-Besucher' },
      { value: '150%', label: 'höhere Conversion-Rate' }
    ]
  }
};

export function TrafficSource() {
  const [source, setSource] = useState<TrafficSource>('unknown');

  useEffect(() => {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    const source = params.get('source');

    // Determine traffic source
    if (source === 'ggl-ad') {
      setSource('google-ads');
    } else if (source === 'ins-ad') {
      setSource('instagram');
    } else if (!source && document.referrer.includes('google')) {
      setSource('organic');
    }
  }, []);

  const content = sourceContent[source];
  const Icon = content.icon;

  return (
    <section className="py-20 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob" />
              <div className="absolute top-0 right-72 w-72 h-72 bg-indigo-500/30 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            </div>

            {/* Content */}
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-gray-700">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-blue-900/50 rounded-full px-4 py-2 mb-6">
                    <Icon className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-300 font-medium">{content.subtitle}</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                    {content.title}
                  </h2>

                  <p className="text-xl text-gray-300 mb-8">
                    {content.description}
                  </p>

                  <div className="grid grid-cols-2 gap-8">
                    {content.stats.map((stat, index) => (
                      <div key={index}>
                        <div className="text-3xl font-bold text-blue-400 mb-2">
                          {stat.value}
                        </div>
                        <div className="text-gray-300">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 to-transparent opacity-50 rounded-2xl" />
                  <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-700">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white">Ihr Potenzial</h3>
                        <p className="text-gray-300">Was wir gemeinsam erreichen können</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-gray-300">
                        <Users className="w-5 h-5 text-blue-400" />
                        <span>Gezielte Kundenansprache</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Target className="w-5 h-5 text-blue-400" />
                        <span>Höhere Conversion-Raten</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        <span>Messbarer ROI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}