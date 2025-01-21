'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Shield, Clock, Phone } from 'lucide-react';

const supportBenefits = [
  'Regelmäßige Updates & Wartung',
  'Technischer Support',
  'Performance-Optimierung',
  'Sicherheits-Updates',
  'Content-Änderungen',
  'Monatliche Berichte'
];

const plans = [
  {
    name: 'Starter',
    price: '990',
    description: 'Ideal für kleine Unternehmen, die online starten möchten',
    features: [
      'Professionelle Website (5 Seiten)',
      'Responsive Design',
      'SEO-Grundoptimierung',
      'Google My Business Optimierung',
      'Basis-Tracking eingerichtet',
      '3 Monate Support'
    ]
  },
  {
    name: 'Professional',
    price: '1.990',
    description: 'Perfekt für Unternehmen, die aktiv neue Kunden gewinnen möchten',
    features: [
      'Premium Website (bis 10 Seiten)',
      'Responsive Design',
      'Umfassende SEO-Optimierung',
      'Google Ads Kampagne',
      'Social Media Werbung',
      'Conversion-Optimierung',
      'Analytics & Tracking',
      '6 Monate Support'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Individuell',
    description: 'Maßgeschneiderte Lösung für größere Unternehmen',
    features: [
      'Enterprise Website',
      'Individuelles Design',
      'Volle SEO-Optimierung',
      'Ganzjährige Werbekampagnen',
      'Content-Marketing',
      'Persönlicher Account Manager',
      '12 Monate Support'
    ]
  }
];

interface PricingProps {
  setSelectedPackage: (pkg: string | undefined) => void;
}

export function Pricing({ setSelectedPackage }: PricingProps) {
  const scrollToContact = (pkg?: string) => {
    setSelectedPackage(pkg);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transparente Preise
          </h2>
          <p className="text-xl text-gray-600">
            Wählen Sie das passende Paket für Ihr Unternehmen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`p-8 relative ${
                plan.popular ? 'border-blue-500 border-2' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                    Beliebt
                  </div>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2">
                  {plan.price === 'Individuell' ? (
                    'Individuell'
                  ) : (
                    <>
                      {plan.price}
                      <span className="text-lg font-normal"> EUR</span>
                    </>
                  )}
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => scrollToContact(plan.name)}
                className={`w-full ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-800 hover:bg-gray-900'
                } text-white`}
              >
                Beratung vereinbaren
              </Button>
            </Card>
          ))}
        </div>

        {/* Support Contract Section */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-bold">Premium Support</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Sichern Sie den langfristigen Erfolg Ihrer Website mit unserem umfassenden Support-Paket.
              </p>
              <div className="flex items-center gap-2 mb-8">
                <div className="text-3xl font-bold">100</div>
                <div className="text-xl">EUR/Monat</div>
              </div>
              <Button
                onClick={() => scrollToContact()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Support sichern
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                <Clock className="w-5 h-5" />
                <span>Schnelle Reaktionszeiten</span>
              </div>
              {supportBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 text-blue-600 font-medium pt-2">
                <Phone className="w-5 h-5" />
                <span>Direkter Ansprechpartner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}