'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function DiagonalLine() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 800L1200 0"
          stroke="url(#lineGradient)"
          strokeWidth="800"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient
            id="lineGradient"
            x1="0"
            y1="800"
            x2="1200"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#ECFCCB" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#86EFAC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
      const res = await fetch('/api/fast', {
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
      <section className="py-20 bg-white relative overflow-hidden" id="contact">
        <DiagonalLine />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-[#1D2433]">Vielen Dank für Ihre Anfrage!</h3>
            <p className="text-gray-600">
              Ich habe Ihre Nachricht erhalten und melde mich innerhalb von 24 Stunden bei Ihnen.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden" id="contact">
      <DiagonalLine />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#1D2433]">
                Lassen Sie uns Ihre Projekte besprechen
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Erfahren Sie, wie ich Ihre Agentur bei der effizienten Umsetzung von Kundenprojekten unterstützen kann.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#1D2433]/5 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-[#1D2433]" />
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <a 
                      href="mailto:info@buchmann.digital" 
                      className="text-[#1D2433] hover:text-blue-600 transition-colors"
                    >
                      info@buchmann.digital
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-[#1D2433]/5 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-[#1D2433]" />
                  </div>
                  <div>
                    <p className="text-gray-500">Telefon</p>
                    <a 
                      href="tel:+491749165008" 
                      className="text-[#1D2433] hover:text-blue-600 transition-colors"
                    >
                      +49 (0) 174 9165008
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-[#1D2433]/5 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#1D2433]" />
                  </div>
                  <div>
                    <p className="text-gray-500">Standort</p>
                    <p className="text-[#1D2433]">Bad Hindelang, Deutschland</p>
                  </div>
                </div>
              </div>

              {/* Legal Links */}
              <div className="mt-8 text-sm text-gray-500 space-x-4">
                <Link href="/impressum" className="hover:text-[#1D2433] transition-colors">
                  Impressum
                </Link>
                <span>·</span>
                <Link href="/datenschutz" className="hover:text-[#1D2433] transition-colors">
                  Datenschutz
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#1D2433]/5 backdrop-blur p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#1D2433] mb-2">
                      Name*
                    </label>
                    <Input
                      id="name"
                      placeholder="Max Mustermann"
                      className="bg-white border-[#1D2433]/10 text-[#1D2433] placeholder:text-gray-500"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#1D2433] mb-2">
                      Email*
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="max@agentur.de"
                      className="bg-white border-[#1D2433]/10 text-[#1D2433] placeholder:text-gray-500"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-[#1D2433] mb-2">
                    Agentur
                  </label>
                  <Input
                    id="company"
                    placeholder="Ihre Agentur"
                    className="bg-white border-[#1D2433]/10 text-[#1D2433] placeholder:text-gray-500"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#1D2433] mb-2">
                    Ihre Nachricht
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Beschreiben Sie kurz Ihre Anforderungen..."
                    className="h-32 bg-white border-[#1D2433]/10 text-[#1D2433] placeholder:text-gray-500"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#1D2433] hover:bg-[#1D2433]/90 text-white"
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
                  <p className="text-red-600 text-sm mt-2">
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