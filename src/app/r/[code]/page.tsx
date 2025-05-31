'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Referrer {
  name: string;
  email: string;
  referralCode: string;
  isActive: boolean;
}

const services = [
  { id: 'website', name: 'Professionelle Website' },
  { id: 'webshop', name: 'Online-Shop' },
  { id: 'webapp', name: 'Web-Anwendung' },
  { id: 'seo', name: 'Suchmaschinenoptimierung (SEO)' },
  { id: 'ads', name: 'Google Ads / Online-Werbung' },
  { id: 'social_media', name: 'Social Media Marketing' },
  { id: 'automation', name: 'Prozessautomatisierung' },
  { id: 'digitalization', name: 'Digitalisierung' },
  { id: 'consulting', name: 'IT-Beratung' },
  { id: 'maintenance', name: 'Website-Wartung' },
  { id: 'hosting', name: 'Hosting & Domains' },
  { id: 'other', name: 'Sonstiges' }
];

export default function ReferralPage() {
  const params = useParams();
  const code = params.code as string;
  
  const [referrer, setReferrer] = useState<Referrer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Track page visit
        await fetch('/api/referral-visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            referralCode: code
          })
        });
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    const loadReferrer = async () => {
      try {
        // Find referrer by code
        const response = await fetch(`/api/get-referrer/${code}`);
        if (response.ok) {
          const data = await response.json();
          setReferrer(data.referrer);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error loading referrer:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    trackVisit();
    loadReferrer();
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lädt...</p>
        </div>
      </div>
    );
  }

  if (error || !referrer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Link nicht gefunden
            </h1>
            <p className="text-gray-600 mb-8">
              Dieser Empfehlungslink ist nicht gültig oder nicht mehr aktiv.
            </p>
            <a
              href="/"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Zur Startseite
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Personalized Header */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-8 mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Hallo! 👋
              </h1>
              <p className="text-xl md:text-2xl mb-4">
                Sie wurden von <span className="font-bold text-yellow-300">{referrer.name}</span> empfohlen
              </p>
              <p className="text-lg opacity-90">
                {referrer.name} dachte, dass ich Ihrem Unternehmen helfen könnte, 
                online erfolgreicher zu werden. Lassen Sie uns darüber sprechen!
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Warum Buchmann Digital?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🏆 Erfahrung</h3>
                  <p className="text-gray-600">Über 100 erfolgreiche Projekte und 10+ Jahre Erfahrung</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🎯 Lokal</h3>
                  <p className="text-gray-600">Persönlicher Ansprechpartner aus dem Allgäu</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">⚡ Schnell</h3>
                  <p className="text-gray-600">Schnelle Umsetzung und direkte Kommunikation</p>
                </div>
              </div>
            </div>
          </div>

          <ReferralContactForm referralCode={code} referrerName={referrer.name} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ReferralContactForm({ referralCode, referrerName }: { referralCode: string; referrerName: string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    services: [] as string[],
    message: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const budgetOptions = [
    { value: 'under-1000', label: 'Unter 1.000 €' },
    { value: '1000-5000', label: '1.000 - 5.000 €' },
    { value: '5000-10000', label: '5.000 - 10.000 €' },
    { value: '10000-25000', label: '10.000 - 25.000 €' },
    { value: 'over-25000', label: 'Über 25.000 €' },
    { value: 'discuss', label: 'Möchte ich besprechen' }
  ];

  const handleServiceChange = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name ist erforderlich';
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }
    if (!formData.company.trim()) newErrors.company = 'Unternehmen ist erforderlich';
    if (formData.services.length === 0) newErrors.services = 'Bitte wählen Sie mindestens eine Dienstleistung';
    if (!formData.message.trim()) newErrors.message = 'Nachricht ist erforderlich';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/referral-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          referralCode,
          referrerName
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({
          name: '', email: '', company: '', phone: '', 
          services: [], message: '', budget: ''
        });
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Vielen Dank für Ihre Anfrage!
        </h3>
        <p className="text-gray-600 mb-4">
          Ich habe Ihre Nachricht erhalten und melde mich innerhalb von 24 Stunden bei Ihnen.
        </p>
        <p className="text-sm text-gray-500">
          Ein herzliches Dankeschön geht auch an {referrerName} für die Empfehlung! 🙏
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Kostenloses Erstgespräch vereinbaren
      </h2>
      <p className="text-gray-600 mb-8">
        Lassen Sie uns besprechen, wie ich Ihrem Unternehmen helfen kann. 
        Das Erstgespräch ist selbstverständlich kostenlos und unverbindlich.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ihr Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Max Mustermann"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-Mail *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="max@beispiel.de"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unternehmen *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.company ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ihre Firma GmbH"
            />
            {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefon (optional)
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="+49 123 456789"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Welche Dienstleistungen interessieren Sie? *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map(service => (
              <label key={service.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.services.includes(service.id)}
                  onChange={() => handleServiceChange(service.id)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">{service.name}</span>
              </label>
            ))}
          </div>
          {errors.services && <p className="mt-1 text-sm text-red-600">{errors.services}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget (optional)
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Bitte wählen...</option>
            {budgetOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ihre Nachricht *
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={5}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Beschreiben Sie kurz Ihr Projekt oder Ihre Anforderungen..."
          />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {isSubmitting ? 'Wird gesendet...' : 'Kostenloses Erstgespräch anfragen'}
        </button>

        {status === 'error' && (
          <p className="text-sm text-red-600 text-center">
            Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.
          </p>
        )}
      </form>
    </div>
  );
} 