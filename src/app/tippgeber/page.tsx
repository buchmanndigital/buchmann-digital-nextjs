'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function TippgeberPage() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Tippgeber-Programm
            </h1>
            <p className="text-xl text-gray-600">
              Empfehlen Sie uns weiter und helfen Sie anderen Unternehmen dabei, 
              ihre digitale Präsenz zu verbessern.
            </p>
          </div>

          <ReferralForm onSuccess={() => setShowSuccessMessage(true)} />

          {showSuccessMessage && (
            <SuccessMessage onClose={() => setShowSuccessMessage(false)} />
          )}

          {/* Dezenter Admin-Link */}
          <div className="text-center mt-12">
            <Link 
              href="/tippgeber/admin" 
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Admin-Bereich
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ReferralForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    recommendedPerson: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    }
    
    if (!formData.recommendedPerson.trim()) {
      newErrors.recommendedPerson = 'Empfohlene Person ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'referrals'), {
        ...formData,
        createdAt: Timestamp.now()
      });
      
      setFormData({ name: '', email: '', recommendedPerson: '', comment: '' });
      setErrors({});
      onSuccess();
    } catch (error) {
      console.error('Fehler beim Speichern der Empfehlung:', error);
      alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Jemanden empfehlen
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Ihr Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Max Mustermann"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Ihre E-Mail *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="max@beispiel.de"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="recommendedPerson" className="block text-sm font-medium text-gray-700 mb-2">
            Empfohlene Person/Unternehmen *
          </label>
          <input
            type="text"
            id="recommendedPerson"
            value={formData.recommendedPerson}
            onChange={(e) => setFormData({ ...formData, recommendedPerson: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.recommendedPerson ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Firma ABC oder Anna Schmidt"
          />
          {errors.recommendedPerson && <p className="mt-1 text-sm text-red-600">{errors.recommendedPerson}</p>}
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Kommentar (optional)
          </label>
          <textarea
            id="comment"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
            placeholder="Weitere Informationen zur Empfehlung..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {isSubmitting ? 'Wird gesendet...' : 'Empfehlung abschicken'}
        </button>
      </form>
    </div>
  );
}

function SuccessMessage({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Vielen Dank!
          </h3>
          <p className="text-gray-600 mb-6">
            Ihre Empfehlung wurde erfolgreich eingereicht. Wir werden uns zeitnah melden.
          </p>
          <button
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
} 