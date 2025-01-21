import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

const cases = [
  {
    company: 'Allgäuer Berghof',
    industry: 'Hotellerie',
    result: '180% mehr Direktbuchungen',
    quote: 'Die neue Website und die Google Ads Kampagnen haben unsere Direktbuchungen deutlich gesteigert. Ein echter Erfolg für unser Hotel!',
    person: 'Maria Schmidt',
    role: 'Geschäftsführerin',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800&h=500'
  },
  {
    company: 'Schreinerei Müller',
    industry: 'Handwerk',
    result: '250% mehr Anfragen',
    quote: 'Seit der Zusammenarbeit mit Buchmann Digital haben wir deutlich mehr qualifizierte Anfragen aus der Region. Die Investition hat sich schnell bezahlt gemacht.',
    person: 'Thomas Müller',
    role: 'Inhaber',
    image: 'https://images.unsplash.com/photo-1622675363311-3e1904dc1885?auto=format&fit=crop&q=80&w=800&h=500'
  },
  {
    company: 'Physio Aktiv',
    industry: 'Gesundheit',
    result: '150% mehr Neukunden',
    quote: 'Die professionelle Online-Präsenz hat uns geholfen, neue Patienten zu gewinnen. Besonders die lokale Google-Werbung bringt uns regelmäßig Neukunden.',
    person: 'Lisa Wagner',
    role: 'Praxisinhaberin',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800&h=500'
  }
];

export function CaseStudies() {
  return (
    <section className="py-20 bg-gray-50" id="case-studies">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Erfolgsgeschichten aus dem Allgäu
          </h2>
          <p className="text-xl text-gray-600">
            Sehen Sie, wie wir anderen Unternehmen aus der Region zu mehr Kunden verholfen haben
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((case_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative w-full h-48">
                <img
                  src={case_.image}
                  alt={case_.company}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{case_.company}</h3>
                    <p className="text-gray-600">{case_.industry}</p>
                  </div>
                  <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {case_.result}
                  </div>
                </div>
                <div className="flex items-start mb-4">
                  <Star className="w-5 h-5 text-yellow-400 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-gray-600 italic">"{case_.quote}"</p>
                </div>
                <div className="border-t pt-4">
                  <p className="font-medium">{case_.person}</p>
                  <p className="text-sm text-gray-600">{case_.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}