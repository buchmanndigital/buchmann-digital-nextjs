'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function TippgeberPage() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [referralLink, setReferralLink] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Als Tippgeber anmelden
            </h1>
            <p className="text-xl text-gray-600">
              Melde dich als Tippgeber an und erhalte einen personalisierten Empfehlungslink.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <TippgeberSignupForm onSuccess={(link) => {
              setReferralLink(link);
              setShowSuccessMessage(true);
            }} />
          </div>

          {showSuccessMessage && (
            <SuccessMessage 
              referralLink={referralLink}
              onClose={() => setShowSuccessMessage(false)} 
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function TippgeberSignupForm({ onSuccess }: { onSuccess: (referralLink: string) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
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
      newErrors.email = 'Bitte gib eine gültige E-Mail-Adresse ein';
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
      const response = await fetch('/api/tippgeber-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({ name: '', email: '' });
        setErrors({});
        onSuccess(data.referralLink);
      } else {
        const errorData = await response.json();
        if (errorData.error === 'EMAIL_EXISTS') {
          setErrors({ email: 'Diese E-Mail-Adresse ist bereits als Tippgeber registriert.' });
        } else {
          alert('Es ist ein Fehler aufgetreten. Bitte versuche es erneut.');
        }
      }
    } catch (error) {
      console.error('Fehler bei der Tippgeber-Anmeldung:', error);
      alert('Es ist ein Fehler aufgetreten. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Werde Tippgeber
        </h2>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            So funktioniert's:
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
              <p className="text-gray-700">Du meldest dich als Tippgeber an und erhältst einen personalisierten Link</p>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
              <p className="text-gray-700">Du teilst diesen Link mit potenziellen Kunden</p>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
              <p className="text-gray-700">Für jeden Kunden, der über deinen Link ein Projekt startet, erhältst du eine Provision</p>
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Dein Name *
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
            Deine E-Mail *
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {isSubmitting ? 'Wird angemeldet...' : 'Als Tippgeber anmelden'}
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Hinweis:</strong> Nach der Anmeldung erhältst du deinen personalisierten Empfehlungslink 
          sofort hier angezeigt und zusätzlich per E-Mail zugesendet.
        </p>
      </div>
    </div>
  );
}

function SuccessMessage({ referralLink, onClose }: { referralLink: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Fehler beim Kopieren:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-lg mx-4 w-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Anmeldung erfolgreich!
          </h3>
          <p className="text-gray-600 mb-6">
            Vielen Dank für deine Anmeldung als Tippgeber. Hier ist dein personalisierter Empfehlungslink:
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Dein persönlicher Empfehlungslink:</h4>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-mono"
              />
              <button
                onClick={copyToClipboard}
                className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                  copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {copied ? 'Kopiert!' : 'Kopieren'}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Teile diesen Link mit potenziellen Kunden und verdiene bei erfolgreichen Projekten mit.
            </p>
          </div>
          
          <p className="text-sm text-gray-600 mb-6">
            Du erhältst zusätzlich eine E-Mail mit deinem Link und weiteren Informationen.
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