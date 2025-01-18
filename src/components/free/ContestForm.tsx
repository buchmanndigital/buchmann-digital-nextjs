'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle2 } from 'lucide-react';

export function ContestForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

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

    if (formRef.current) {
      formRef.current.classList.add('slide-up-hidden');
      observer.observe(formRef.current);
    }

    if (successRef.current) {
      successRef.current.classList.add('fade-in-hidden');
      observer.observe(successRef.current);
    }

    return () => observer.disconnect();
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.company) {
      setStatus('error');
      return;
    }

    // Manuelle URL-Validierung
    if (formData.website && !/^https?:\/\//i.test(formData.website)) {
      setFormData({ ...formData, website: 'http://' + formData.website });
    }

    setStatus('sending');

    try {
      const res = await fetch('/api/free-contest', {
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
          company: '',
          website: '',
          phone: '',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        className="text-center py-16"
      >
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h3 className="text-2xl font-bold mb-4">Bewerbung erfolgreich!</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Vielen Dank für deine Teilnahme. Ich prüfe deine Bewerbung und melde mich innerhalb von 48 Stunden bei dir.
        </p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-indigo-50" id="contest-form">
      <div className="container mx-auto px-4">
        <div 
          ref={formRef}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 bg-indigo-600 text-white">
              <h2 className="text-3xl font-bold mb-6">Jetzt bewerben</h2>
              <p className="mb-6">
                Fülle das Formular aus und überzeuge uns, warum dein Unternehmen eine neue Website verdient hat.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                    1
                  </div>
                  <p>Formular ausfüllen</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                    2
                  </div>
                  <p>Bestätigungsmail erhalten</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                    3
                  </div>
                  <p>Auf Rückmeldung warten</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name*</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Max Mustermann"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">E-Mail*</label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="max@firma.de"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Unternehmen*</label>
                  <Input
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Firma GmbH"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Website (falls vorhanden)
                  </label>
                  <Input
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="www.firma.de"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Telefon</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+49 123 4567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Warum sollte dein Unternehmen gewinnen?
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Erzähle uns von deinem Unternehmen und warum du eine neue Website brauchst..."
                    className="h-32"
                  />
                </div>

                <div className="text-sm text-gray-600">
                  Mit dem Absenden des Formulars akzeptierst du unsere{' '}
                  <Link href="/free/agb" className="text-indigo-600 hover:underline">
                    Allgemeinen Geschäftsbedingungen (AGB)
                  </Link>.
                </div>

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    'Wird gesendet...'
                  ) : (
                    <>
                      Jetzt bewerben
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                {status === 'error' && (
                  <p className="text-sm text-red-600 mt-2">
                    Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.
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