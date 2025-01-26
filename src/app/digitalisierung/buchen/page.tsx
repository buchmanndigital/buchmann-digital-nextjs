'use client';

import { useEffect } from 'react';
import { Navigation } from '@/components/digitalization/Navigation';
import { Footer } from '@/components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

declare global {
  interface Window {
    Calendly: any;
  }
}

export default function BookingPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />
      <main className="pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">
              Starten Sie jetzt Ihre digitale Transformation
            </h1>
            <p className="text-xl text-gray-600">
              Vereinbaren Sie Ihr kostenloses Erstgespräch und erfahren Sie, 
              wie Sie Ihre Prozesse digitalisieren können.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="bg-blue-100 p-3 rounded-lg mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-gray-600 mb-2">Email</p>
                <a 
                  href="mailto:info@buchmann.digital" 
                  className="text-gray-900 hover:text-blue-600 transition-colors"
                >
                  info@buchmann.digital
                </a>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="bg-blue-100 p-3 rounded-lg mb-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-gray-600 mb-2">Telefon</p>
                <a 
                  href="tel:+491749165008" 
                  className="text-gray-900 hover:text-blue-600 transition-colors"
                >
                  +49 (0) 174 9165008
                </a>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="bg-blue-100 p-3 rounded-lg mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-gray-600 mb-2">Standort</p>
                <p className="text-gray-900">Bad Hindelang, Deutschland</p>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto bg-white p-2 rounded-2xl shadow-lg mb-12">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/anmeldungen-buchmann/30min?background_color=ffffff&text_color=1e293b&primary_color=2563eb"
              style={{ 
                height: '700px'
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}