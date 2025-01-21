'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Package } from 'lucide-react';

const packages = ['Starter', 'Professional', 'Enterprise'];

interface ContactFormProps {
  selectedPackage?: string;
}

export function ContactForm({ selectedPackage }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    package: selectedPackage || '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, package: selectedPackage || '' }));
  }, [selectedPackage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch('/api/customer-acquisition-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          package: '',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="py-20 bg-white mt-16" id="contact">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Vielen Dank für Ihre Anfrage!</h3>
            <p className="text-base text-gray-600">
              Ich habe Ihre Nachricht erhalten und melde mich innerhalb von 24 Stunden bei Ihnen.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white mt-16" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Lassen Sie uns Ihr Unternehmen voranbringen
              </h2>
              <p className="text-base text-gray-600 mb-12">
                Vereinbaren Sie jetzt Ihre kostenlose Erstberatung. Ich analysiere Ihre aktuelle Situation und zeige Ihnen, wie Sie mehr Kunden gewinnen können.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-base font-medium mb-2">Name*</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Max Mustermann"
                    required
                    className="text-base h-12"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium mb-2">Email*</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="max@firma.de"
                    required
                    className="text-base h-12"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium mb-2">Telefon</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+49 123 4567890"
                    className="text-base h-12"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium mb-2">Unternehmen</label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Firma GmbH"
                    className="text-base h-12"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium mb-2">Paket</label>
                  <select
                    value={formData.package}
                    onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                    className="text-base h-12 w-full border-gray-300 rounded-md"
                  >
                    <option value="">Bitte wählen</option>
                    {packages.map((pkg) => (
                      <option key={pkg} value={pkg}>
                        {pkg}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-base font-medium mb-2">Ihre Anfrage</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Beschreiben Sie kurz Ihr Projekt und Ihre Ziele. Ich melde mich dann mit konkreten Vorschlägen bei Ihnen."
                    className="text-base h-32 leading-relaxed"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Wird gesendet...' : 'Jetzt anfragen'}
                </Button>

                {status === 'error' && (
                  <p className="text-base text-red-600 mt-2">
                    Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}