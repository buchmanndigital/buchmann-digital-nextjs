'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full bg-gray-900/80 backdrop-blur-sm z-50 py-4 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <button 
            className="text-2xl font-bold flex items-center text-white"
            onClick={() => {
              router.push('/');
            }}
          >
            <Image 
              src="/images/buchmann-digital-logo.png" 
              alt="Buchmann Digital Logo" 
              width={25} 
              height={25} 
              className="mr-2 invert"
            />
            Buchmann Digital
          </button>

          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <nav className="hidden lg:flex items-center">
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6"
              onClick={() => scrollToSection('project-contact-form')}
            >
              Kontakt aufnehmen
            </Button>
          </nav>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col gap-4">
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white w-full"
                onClick={() => scrollToSection('project-contact-form')}
              >
                Kontakt aufnehmen
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}