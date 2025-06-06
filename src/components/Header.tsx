'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
  hiddenMenuItems?: string[];
}

export function Header({ hiddenMenuItems = [] }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const shouldShowMenuItem = (itemId: string) => {
    return !hiddenMenuItems.includes(itemId);
  };

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-sm z-50 py-4 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <button 
            className="text-2xl font-bold flex items-center"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
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

          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {shouldShowMenuItem('bewertungen') && (
              <button 
                className="text-gray-600 hover:text-gray-900"
                onClick={() => scrollToSection('bewertungen')}
              >
                Bewertungen
              </button>
            )}
            {shouldShowMenuItem('roadmap') && (
              <button 
                className="text-gray-600 hover:text-gray-900"
                onClick={() => scrollToSection('roadmap')}
              >
                Dein Weg
              </button>
            )}
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6"
              onClick={() => scrollToSection('kontakt')}
            >
              Kostenloses Erstgespräch
            </Button>
          </nav>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col gap-4">
              <button 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
              >
                Startseite
              </button>
              {shouldShowMenuItem('bewertungen') && (
                <button 
                  className="text-gray-600 hover:text-gray-900 py-2"
                  onClick={() => scrollToSection('bewertungen')}
                >
                  Bewertungen
                </button>
              )}
              {shouldShowMenuItem('roadmap') && (
                <button 
                  className="text-gray-600 hover:text-gray-900 py-2"
                  onClick={() => scrollToSection('roadmap')}
                >
                  Dein Weg
                </button>
              )}
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white w-full"
                onClick={() => scrollToSection('kontakt')}
              >
                Kostenloses Erstgespräch
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}