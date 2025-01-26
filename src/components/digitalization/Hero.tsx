'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, TrendingDown, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      contentRef.current.classList.add('fade-in-hidden');
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div 
          ref={contentRef}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
            <Zap className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-medium">Digitalisierung leicht gemacht</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="block">Automatisieren Sie Ihre Abläufe</span>
            <span className="block text-blue-600">und sparen Sie bis zu 30%</span>
            <span className="block">Ihrer Betriebskosten</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Entdecken Sie, wie moderne Technologien und KI Ihr Unternehmen effizienter machen – 
            mit messbaren Ergebnissen in wenigen Wochen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={() => router.push('/digitalisierung/buchen')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg group"
            >
              Kostenloses Beratungsgespräch
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur rounded-lg p-6 shadow-lg">
              <Clock className="w-8 h-8 text-blue-600 mb-2 mx-auto" />
              <div className="text-2xl font-bold text-blue-600">70%</div>
              <p className="text-gray-600">Zeitersparnis bei Routineaufgaben</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur rounded-lg p-6 shadow-lg">
              <TrendingDown className="w-8 h-8 text-blue-600 mb-2 mx-auto" />
              <div className="text-2xl font-bold text-blue-600">30%</div>
              <p className="text-gray-600">Reduzierung der Betriebskosten</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur rounded-lg p-6 shadow-lg">
              <Zap className="w-8 h-8 text-blue-600 mb-2 mx-auto" />
              <div className="text-2xl font-bold text-blue-600">2-4</div>
              <p className="text-gray-600">Wochen bis zur ersten Automation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}