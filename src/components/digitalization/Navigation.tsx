'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isBookingPage = pathname === '/digitalisierung/buchen';

  const scrollToSection = (id: string) => {
    if (isBookingPage) {
      router.push('/digitalisierung');
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
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-sm z-50 py-4 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <button 
            className="text-2xl font-bold flex items-center"
            onClick={() => router.push('/')}
          >
            <Image 
              src="/images/buchmann-digital-logo.png" 
              alt="Buchmann Digital Logo" 
              width={25} 
              height={25} 
              className="mr-2"
            />
            Buchmann Digital
          </button>

          {!isBookingPage && (
            <>
              <button
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              <nav className="hidden lg:flex items-center gap-8">
                <button 
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => scrollToSection('about')}
                >
                  Über mich
                </button>
                <button 
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => scrollToSection('benefits')}
                >
                  Vorteile
                </button>
                <button 
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => scrollToSection('process')}
                >
                  Ablauf
                </button>
                <button 
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => scrollToSection('calculator')}
                >
                  ROI-Rechner
                </button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                  onClick={() => router.push('/digitalisierung/buchen')}
                >
                  Jetzt beraten lassen
                </Button>
              </nav>
            </>
          )}
        </div>

        {!isBookingPage && isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col gap-4">
              <button 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => scrollToSection('about')}
              >
                Über mich
              </button>
              <button 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => scrollToSection('benefits')}
              >
                Vorteile
              </button>
              <button 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => scrollToSection('process')}
              >
                Ablauf
              </button>
              <button 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => scrollToSection('calculator')}
              >
                ROI-Rechner
              </button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                onClick={() => router.push('/digitalisierung/buchen')}
              >
                Jetzt beraten lassen
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}