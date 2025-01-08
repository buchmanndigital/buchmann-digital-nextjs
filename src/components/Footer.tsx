'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function Footer() {
  const router = useRouter();

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== '/') {
      router.push('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-white text-gray-600 py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Buchmann Digital</h3>
            <p className="text-gray-600">Ihr Partner für digitale Transformation</p>
            <p className="mt-4 text-sm text-gray-500">© 2024 Florian Buchmann.<br />Alle Rechte vorbehalten.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-gray-900">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => {
                    router.push('/');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Startseite
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Über mich
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Leistungen
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('faq')}
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-gray-900">Rechtliches</h4>
            <ul className="space-y-2">
              <li>
                <Button 
                  variant="link" 
                  className="text-gray-600 hover:text-indigo-600 p-0 h-auto font-normal"
                  onClick={() => router.push('/impressum')}
                >
                  Impressum
                </Button>
              </li>
              <li>
                <Button 
                  variant="link" 
                  className="text-gray-600 hover:text-indigo-600 p-0 h-auto font-normal"
                  onClick={() => router.push('/datenschutz')}
                >
                  Datenschutz
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}