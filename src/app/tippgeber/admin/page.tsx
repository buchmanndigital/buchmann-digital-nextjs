'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, Timestamp, doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Head from 'next/head';

interface Referral {
  id: string;
  name: string;
  email: string;
  recommendedPerson: string;
  comment: string;
  createdAt: Timestamp;
}

export default function TippgeberAdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Funktion zum Prüfen des Admin-Status
  const checkAdminStatus = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.isAdmin === true;
      }
      return false;
    } catch (error) {
      console.error('Fehler beim Prüfen des Admin-Status:', error);
      return false;
    }
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        const adminStatus = await checkAdminStatus(user.uid);
        setIsAdmin(adminStatus);
        if (adminStatus) {
          loadReferrals();
        }
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadReferrals = async () => {
    try {
      const q = query(collection(db, 'referrals'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const referralData: Referral[] = [];
      querySnapshot.forEach((doc) => {
        referralData.push({ id: doc.id, ...doc.data() } as Referral);
      });
      setReferrals(referralData);
    } catch (error) {
      console.error('Fehler beim Laden der Empfehlungen:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false);
    } catch (error) {
      console.error('Fehler beim Logout:', error);
    }
  };

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

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="googlebot" content="noindex, nofollow" />
        <title>Admin-Bereich - Nicht öffentlich</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Tippgeber-Administration
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Verwalten Sie eingereichte Empfehlungen und überwachen Sie das Tippgeber-Programm.
              </p>
            </div>

            {!user ? (
              <div className="max-w-md mx-auto">
                <AdminLogin />
              </div>
            ) : isAdmin ? (
              <AdminPanel 
                referrals={referrals} 
                onLogout={handleLogout}
                onRefresh={loadReferrals}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-600 mb-4">
                  Sie sind als {user.email} angemeldet, haben aber keine Admin-Berechtigung.
                </p>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Abmelden
                </button>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
    } catch (error: any) {
      setError('Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.');
      console.error('Login error:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Admin-Anmeldung
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-2">
            E-Mail
          </label>
          <input
            type="email"
            id="admin-email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-2">
            Passwort
          </label>
          <input
            type="password"
            id="admin-password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {isLoggingIn ? 'Anmelden...' : 'Anmelden'}
        </button>
      </form>
    </div>
  );
}

function AdminPanel({ 
  referrals, 
  onLogout, 
  onRefresh 
}: { 
  referrals: Referral[]; 
  onLogout: () => void;
  onRefresh: () => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Empfehlungen verwalten
          </h2>
          <div className="flex gap-4">
            <button
              onClick={onRefresh}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Aktualisieren
            </button>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Abmelden
            </button>
          </div>
        </div>
        <p className="text-gray-600 mt-2">
          Insgesamt {referrals.length} Empfehlung(en)
        </p>
      </div>

      <div className="p-6">
        {referrals.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Noch keine Empfehlungen vorhanden.
          </p>
        ) : (
          <div className="space-y-6">
            {referrals.map((referral) => (
              <div key={referral.id} className="border border-gray-200 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Empfehler</p>
                    <p className="text-gray-900">{referral.name}</p>
                    <p className="text-gray-600">{referral.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Empfohlene Person</p>
                    <p className="text-gray-900">{referral.recommendedPerson}</p>
                  </div>
                </div>
                
                {referral.comment && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500 mb-1">Kommentar</p>
                    <p className="text-gray-900">{referral.comment}</p>
                  </div>
                )}
                
                <div className="text-sm text-gray-500">
                  Eingereicht am {referral.createdAt.toDate().toLocaleDateString('de-DE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 