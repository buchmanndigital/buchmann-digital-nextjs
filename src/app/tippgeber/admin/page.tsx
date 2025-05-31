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

interface ReferralContact {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  services: string[];
  message: string;
  budget: string;
  referralCode: string;
  referrerName: string;
  createdAt: Timestamp;
  status: string;
}

interface Referrer {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  isActive: boolean;
  visitCount?: number;
  contactCount?: number;
  lastVisit?: Date;
  lastContact?: Date;
  contacts?: ReferralContact[];
  createdAt: Timestamp;
}

const serviceNames: Record<string, string> = {
  'website': 'Professionelle Website',
  'webshop': 'Online-Shop',
  'webapp': 'Web-Anwendung',
  'seo': 'Suchmaschinenoptimierung (SEO)',
  'ads': 'Google Ads / Online-Werbung',
  'social_media': 'Social Media Marketing',
  'automation': 'Prozessautomatisierung',
  'digitalization': 'Digitalisierung',
  'consulting': 'IT-Beratung',
  'maintenance': 'Website-Wartung',
  'hosting': 'Hosting & Domains',
  'other': 'Sonstiges'
};

const budgetLabels: Record<string, string> = {
  'under-1000': 'Unter 1.000 €',
  '1000-5000': '1.000 - 5.000 €',
  '5000-10000': '5.000 - 10.000 €',
  '10000-25000': '10.000 - 25.000 €',
  'over-25000': 'Über 25.000 €',
  'discuss': 'Möchte ich besprechen'
};

export default function TippgeberAdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referralContacts, setReferralContacts] = useState<ReferralContact[]>([]);
  const [referrers, setReferrers] = useState<Referrer[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'referrers' | 'contacts' | 'referrals'>('referrers');

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
          loadAllData();
        }
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadAllData = async () => {
    await Promise.all([
      loadReferrers(),
      loadReferrals(),
      loadReferralContacts()
    ]);
  };

  const loadReferrers = async () => {
    try {
      const q = query(collection(db, 'referrers'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const referrerData: Referrer[] = [];
      querySnapshot.forEach((doc) => {
        referrerData.push({ id: doc.id, ...doc.data() } as Referrer);
      });
      setReferrers(referrerData);
    } catch (error) {
      console.error('Fehler beim Laden der Referrer:', error);
    }
  };

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

  const loadReferralContacts = async () => {
    try {
      const q = query(collection(db, 'referral_contacts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const contactData: ReferralContact[] = [];
      querySnapshot.forEach((doc) => {
        contactData.push({ id: doc.id, ...doc.data() } as ReferralContact);
      });
      setReferralContacts(contactData);
    } catch (error) {
      console.error('Fehler beim Laden der Referral-Kontakte:', error);
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
          <div className="max-w-6xl mx-auto">
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
                referrers={referrers}
                referrals={referrals}
                referralContacts={referralContacts}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={handleLogout}
                onRefresh={loadAllData}
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
  referrers,
  referrals,
  referralContacts,
  activeTab,
  setActiveTab,
  onLogout, 
  onRefresh 
}: { 
  referrers: Referrer[];
  referrals: Referral[];
  referralContacts: ReferralContact[];
  activeTab: 'referrers' | 'contacts' | 'referrals';
  setActiveTab: (tab: 'referrers' | 'contacts' | 'referrals') => void;
  onLogout: () => void;
  onRefresh: () => void;
}) {
  const totalVisits = referrers.reduce((sum, ref) => sum + (ref.visitCount || 0), 0);
  const totalContacts = referrers.reduce((sum, ref) => sum + (ref.contactCount || 0), 0);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Tippgeber-Dashboard
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

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-600">Aktive Tippgeber</p>
            <p className="text-2xl font-bold text-blue-900">{referrers.filter(r => r.isActive).length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm font-medium text-green-600">Gesamt Visits</p>
            <p className="text-2xl font-bold text-green-900">{totalVisits}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-sm font-medium text-yellow-600">Gesamt Kontakte</p>
            <p className="text-2xl font-bold text-yellow-900">{totalContacts}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm font-medium text-purple-600">Empfehlungen</p>
            <p className="text-2xl font-bold text-purple-900">{referrals.length}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('referrers')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'referrers'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Tippgeber ({referrers.length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'contacts'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Alle Kontakte ({referralContacts.length})
          </button>
          <button
            onClick={() => setActiveTab('referrals')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'referrals'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Empfehlungen ({referrals.length})
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'referrers' && (
          <ReferrersList referrers={referrers} />
        )}
        {activeTab === 'contacts' && (
          <ReferralContactsList contacts={referralContacts} />
        )}
        {activeTab === 'referrals' && (
          <ReferralsList referrals={referrals} />
        )}
      </div>
    </div>
  );
}

function ReferrersList({ referrers }: { referrers: Referrer[] }) {
  if (referrers.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        Noch keine Tippgeber registriert.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {referrers.map((referrer) => (
        <div key={referrer.id} className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{referrer.name}</h3>
              <p className="text-gray-600">{referrer.email}</p>
              <p className="text-sm font-mono text-blue-600">
                Link: www.buchmann.digital/r/{referrer.referralCode}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              referrer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {referrer.isActive ? 'Aktiv' : 'Inaktiv'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Visits</p>
              <p className="text-xl font-bold text-gray-900">{referrer.visitCount || 0}</p>
              {referrer.lastVisit && (
                <p className="text-xs text-gray-500">
                  Letzter: {new Date(referrer.lastVisit).toLocaleDateString('de-DE')}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Kontakte</p>
              <p className="text-xl font-bold text-green-600">{referrer.contactCount || 0}</p>
              {referrer.lastContact && (
                <p className="text-xs text-gray-500">
                  Letzter: {new Date(referrer.lastContact).toLocaleDateString('de-DE')}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Conversion</p>
              <p className="text-xl font-bold text-purple-600">
                {referrer.visitCount && referrer.visitCount > 0 
                  ? ((referrer.contactCount || 0) / referrer.visitCount * 100).toFixed(1)
                  : '0'
                }%
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Registriert</p>
              <p className="text-sm text-gray-900">
                {referrer.createdAt.toDate().toLocaleDateString('de-DE')}
              </p>
            </div>
          </div>

          {referrer.contacts && referrer.contacts.length > 0 && (
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-3">
                Kontakte über diesen Link ({referrer.contacts.length})
              </h4>
              <div className="space-y-3">
                {referrer.contacts.map((contact, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 border-l-4 border-green-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.company}</p>
                        <p className="text-sm text-gray-500">{contact.email}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          contact.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {contact.status === 'new' ? 'Neu' : contact.status}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {contact.createdAt.toDate().toLocaleDateString('de-DE')}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <strong>Services:</strong> {contact.services.map(s => serviceNames[s] || s).join(', ')}
                      </p>
                      {contact.budget && (
                        <p className="text-sm text-gray-600">
                          <strong>Budget:</strong> {budgetLabels[contact.budget] || contact.budget}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ReferralContactsList({ contacts }: { contacts: ReferralContact[] }) {
  if (contacts.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        Noch keine Referral-Kontakte vorhanden.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {contacts.map((contact) => (
        <div key={contact.id} className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
              <p className="text-gray-600">{contact.company}</p>
              <p className="text-sm text-green-600 font-medium">
                Empfohlen von: {contact.referrerName} ({contact.referralCode})
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              contact.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {contact.status === 'new' ? 'Neu' : contact.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Kontakt</p>
              <p className="text-gray-900">{contact.email}</p>
              {contact.phone && <p className="text-gray-600">{contact.phone}</p>}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Budget</p>
              <p className="text-gray-900">
                {contact.budget ? budgetLabels[contact.budget] || contact.budget : 'Nicht angegeben'}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Interessierte Dienstleistungen</p>
            <div className="flex flex-wrap gap-2">
              {contact.services.map((serviceId, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                  {serviceNames[serviceId] || serviceId}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-500 mb-1">Nachricht</p>
            <p className="text-gray-900">{contact.message}</p>
          </div>

          <div className="text-sm text-gray-500">
            Eingereicht am {contact.createdAt.toDate().toLocaleDateString('de-DE', {
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
  );
}

function ReferralsList({ referrals }: { referrals: Referral[] }) {
  if (referrals.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        Noch keine Empfehlungen vorhanden.
      </p>
    );
  }

  return (
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
  );
} 