'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, CheckCircle2, Send, Lightbulb, User, Building } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectTitle: '',
    projectDescription: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.projectTitle) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch('/api/hundert', {
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
          projectTitle: '',
          projectDescription: ''
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
      <section className="py-16 bg-gray-800" id="project-contact-form">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-white">Vielen Dank für deine Projektidee!</h3>
            <p className="text-gray-300">
              Ich habe deine Einreichung erhalten und prüfe, ob dein Projekt in die 100 Projekte aufgenommen werden kann.
              Ich melde mich in Kürze bei dir.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-800" id="project-contact-form">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">
                Werde Teil der 100 Projekte
              </h2>
              <p className="text-lg text-gray-300 mb-10">
                Hast du eine spannende Projektidee oder möchtest du mit mir zusammenarbeiten? 
                Reiche dein Projekt ein und werde Teil meiner 100 Projekte-Challenge.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-900 p-3 rounded-lg mt-1">
                    <Lightbulb className="w-6 h-6 text-indigo-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Innovative Ideen</h3>
                    <p className="text-gray-400">
                      Von Webseiten über Apps bis hin zu komplexen Systemen - ich suche nach spannenden Herausforderungen.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-900 p-3 rounded-lg mt-1">
                    <Mail className="w-6 h-6 text-indigo-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Direkter Kontakt</h3>
                    <a 
                      href="mailto:info@buchmann.digital" 
                      className="text-indigo-300 hover:text-indigo-400 transition-colors"
                    >
                      info@buchmann.digital
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-700 p-8 rounded-2xl shadow-lg border border-gray-600">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                    Name*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="name"
                      placeholder="Max Mustermann"
                      className="pl-10 bg-gray-800 border-gray-600 text-gray-200 text-base"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                    Email*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="max@beispiel.de"
                      className="pl-10 bg-gray-800 border-gray-600 text-gray-200 text-base"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-200 mb-1">
                    Unternehmen
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="company"
                      placeholder="Dein Unternehmen (optional)"
                      className="pl-10 bg-gray-800 border-gray-600 text-gray-200 text-base"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-200 mb-1">
                    Projektname*
                  </label>
                  <Input
                    id="projectTitle"
                    placeholder="Kurzer, prägnanter Titel für dein Projekt"
                    className="bg-gray-800 border-gray-600 text-gray-200 w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-200 mb-1">
                    Projektbeschreibung*
                  </label>
                  <Textarea
                    id="projectDescription"
                    placeholder="Beschreibe dein Projekt und deine Anforderungen..."
                    className="h-32 bg-gray-800 border-gray-600 text-gray-200 w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    required
                  />
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
                      Projekt einreichen
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                {status === 'error' && (
                  <p className="text-red-400 text-sm mt-2">
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