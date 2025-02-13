'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch('/api/web-development', {
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
      <section className="py-20 bg-slate-900/50" id="contact">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle2 className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-white">Vielen Dank für Ihre Anfrage!</h3>
            <p className="text-slate-300">
              Ich habe Ihre Nachricht erhalten und melde mich innerhalb von 24 Stunden bei Ihnen.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-900/50" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
                Lassen Sie uns Ihre Projekte besprechen
              </h2>
              <p className="text-xl text-slate-300 mb-12">
                Erfahren Sie, wie wir Ihre Agentur bei der effizienten Umsetzung von Kundenprojekten unterstützen können.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-cyan-900/20 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-slate-400">Email</p>
                    <a 
                      href="mailto:info@buchmann.digital" 
                      className="text-white hover:text-cyan-400 transition-colors"
                    >
                      info@buchmann.digital
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-cyan-900/20 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-slate-400">Telefon</p>
                    <a 
                      href="tel:+491749165008" 
                      className="text-white hover:text-cyan-400 transition-colors"
                    >
                      +49 (0) 174 9165008
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-cyan-900/20 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-slate-400">Standort</p>
                    <p className="text-white">Bad Hindelang, Deutschland</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-800/50 backdrop-blur p-8 rounded-2xl border border-slate-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                      Name*
                    </label>
                    <Input
                      id="name"
                      placeholder="Max Mustermann"
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email*
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="max@agentur.de"
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                      Telefon
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+49 123 4567890"
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                      Agentur
                    </label>
                    <Input
                      id="company"
                      placeholder="Ihre Agentur"
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Ihre Nachricht
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Beschreiben Sie kurz Ihre Anforderungen..."
                    className="h-32 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    'Wird gesendet...'
                  ) : (
                    <>
                      Unverbindlich anfragen
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                {status === 'error' && (
                  <p className="text-red-400 text-sm mt-2">
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