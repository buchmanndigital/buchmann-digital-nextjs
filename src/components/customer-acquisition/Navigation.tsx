'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-sm z-50 py-4 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <button 
            className="text-2xl font-bold flex items-center"
            onClick={() => router.push('/')}
          >
            <img 
              src="/images/buchmann-digital-logo.png" 
              alt="Buchmann Digital Logo" 
              className="w-6 h-6 mr-2"
            />
            Buchmann Digital
          </button>

          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            <button 
              className="text-gray-600 hover:text-gray-900"
              onClick={() => scrollToSection('personal')}
            >
              Über mich
            </button>
            <button 
              className="text-gray-600 hover:text-gray-900"
              onClick={() => scrollToSection('process')}
            >
              Ablauf
            </button>
            <button 
              className="text-gray-600 hover:text-gray-900"
              onClick={() => scrollToSection('services')}
            >
              Leistungen
            </button>
            <button 
              className="text-gray-600 hover:text-gray-900"
              onClick={() => scrollToSection('case-studies')}
            >
              Referenzen
            </button>
            <button 
              className="text-gray-600 hover:text-gray-900"
              onClick={() => scrollToSection('pricing')}
            >
              Preise
            </button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              onClick={() => scrollToSection('contact')}
            >
              Beratung vereinbaren
            </Button>
          </nav>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col gap-4">
              <button 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => scrollToSection('personal')}
              >
                Über mich
              </button>
              <button 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => scrollToSection('process')}
              >
                Ablauf
              </button>
              <button 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => scrollToSection('services')}
              >
                Leistungen
              </button>
              <button 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => scrollToSection('case-studies')}
              >
                Referenzen
              </button>
              <button 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => scrollToSection('pricing')}
              >
                Preise
              </button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                onClick={() => scrollToSection('contact')}
              >
                Beratung vereinbaren
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}