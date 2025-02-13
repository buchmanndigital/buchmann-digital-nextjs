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
    <header className="fixed w-full bg-slate-900/80 backdrop-blur-sm z-50 py-4 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <button 
            className="text-2xl font-bold flex items-center text-white"
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

          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            <button 
              className="text-slate-300 hover:text-white transition-colors"
              onClick={() => scrollToSection('benefits')}
            >
              Vorteile
            </button>
            <button 
              className="text-slate-300 hover:text-white transition-colors"
              onClick={() => scrollToSection('process')}
            >
              Ablauf
            </button>
            <button 
              className="text-slate-300 hover:text-white transition-colors"
              onClick={() => scrollToSection('features')}
            >
              Features
            </button>
            <Button 
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6"
              onClick={() => scrollToSection('contact')}
            >
              Jetzt anfragen
            </Button>
          </nav>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col gap-4">
              <button 
                className="text-slate-300 hover:text-white py-2"
                onClick={() => scrollToSection('benefits')}
              >
                Vorteile
              </button>
              <button 
                className="text-slate-300 hover:text-white py-2"
                onClick={() => scrollToSection('process')}
              >
                Ablauf
              </button>
              <button 
                className="text-slate-300 hover:text-white py-2"
                onClick={() => scrollToSection('features')}
              >
                Features
              </button>
              <Button 
                className="bg-cyan-500 hover:bg-cyan-600 text-white w-full"
                onClick={() => scrollToSection('contact')}
              >
                Jetzt anfragen
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}