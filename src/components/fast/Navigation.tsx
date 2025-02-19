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
    <header className="fixed w-full bg-white/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[72px]">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push('/')}
              className="text-[20px] font-semibold tracking-tight text-[#1D2433] flex items-center gap-2"
            >
              <Image 
                src="/images/buchmann-digital-logo.png" 
                alt="Buchmann Digital Logo" 
                width={25} 
                height={25} 
              />
              Buchmann Digital
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            <nav className="flex items-center gap-10">
              <button 
                className="text-[15px] text-[#384250] hover:text-[#1D2433] transition-colors"
                onClick={() => scrollToSection('features')}
              >
                Vorteile
              </button>
              <button 
                className="text-[15px] text-[#384250] hover:text-[#1D2433] transition-colors"
                onClick={() => scrollToSection('process')}
              >
                Ablauf
              </button>
              <button 
                className="text-[15px] text-[#384250] hover:text-[#1D2433] transition-colors"
                onClick={() => scrollToSection('contact')}
              >
                Kontakt
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-[#1D2433] hover:bg-[#1D2433]/90 text-white group"
              >
                Unverbindlich anfragen
              </Button>
            </div>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col gap-4">
              <button 
                className="text-[15px] text-[#384250] hover:text-[#1D2433] py-2"
                onClick={() => scrollToSection('features')}
              >
                Vorteile
              </button>
              <button 
                className="text-[15px] text-[#384250] hover:text-[#1D2433] py-2"
                onClick={() => scrollToSection('process')}
              >
                Ablauf
              </button>
              <button 
                className="text-[15px] text-[#384250] hover:text-[#1D2433] py-2"
                onClick={() => scrollToSection('contact')}
              >
                Kontakt
              </button>
              <Button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-[#1D2433] hover:bg-[#1D2433]/90 text-white"
              >
                Unverbindlich anfragen
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}