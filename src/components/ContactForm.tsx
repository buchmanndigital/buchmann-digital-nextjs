'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      setStatus('Name und E-Mail sind Pflichtfelder.');
      return;
    }

    setStatus('Senden...');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, company, message }),
    });

    if (res.ok) {
      setStatus('Nachricht gesendet!');
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setMessage('');
    } else {
      setStatus('Fehler beim Senden der Nachricht.');
    }
  };

  return (
    <section className="w-full bg-gray-900 py-20" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-8">Kontaktieren Sie mich</h2>
              <p className="text-gray-400 mb-12 text-lg">
                Lassen Sie uns gemeinsam Ihr nächstes Projekt besprechen. Ich freue mich darauf, von Ihnen zu hören.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-600/20 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <a 
                      href="mailto:info@buchmann.digital" 
                      className="text-white hover:text-indigo-400 transition-colors"
                    >
                      info@buchmann.digital
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-600/20 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-gray-400">Telefon</p>
                    <a 
                      href="tel:+491749165008" 
                      className="text-white hover:text-indigo-400 transition-colors"
                    >
                      +49 (0) 174 9165008
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-600/20 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-gray-400">Standort</p>
                    <p className="text-white">Bad Hindelang, Deutschland</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800 p-8 rounded-2xl">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      Name*
                    </label>
                    <Input
                      id="name"
                      placeholder="Max Mustermann"
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 text-base md:text-lg"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      Email*
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="max@beispiel.de"
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 text-base md:text-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                      Telefon
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+49 123 456789"
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 text-base md:text-lg"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-2">
                      Unternehmen
                    </label>
                    <Input
                      id="company"
                      placeholder="Ihre Firma"
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 text-base md:text-lg"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Nachricht*
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Ihre Nachricht..."
                    className="h-32 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 text-base md:text-lg"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  Unverbindlich anfragen
                </Button>
                {status && <p className="text-sm text-gray-400 mt-2">{status}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}