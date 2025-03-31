'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function PromotionBanner() {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  
  // Prüfen, ob wir auf einem mobilen Gerät sind
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint in Tailwind
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Intersection Observer für Scroll-Animation auf mobilen Geräten
  useEffect(() => {
    if (!bannerRef.current || !isMobile) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 } // Wenn 30% des Elements sichtbar sind
    );
    
    observer.observe(bannerRef.current);
    
    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, [isMobile]);
  
  // Animationszustand - entweder durch Hover oder durch Scroll (auf Mobil)
  const isAnimated = isMobile ? isInView : isHovered;
  
  // Vereinfachte Animation für alle Kindelemente
  const transition = {
    duration: 0.35,
    ease: [0.25, 0.1, 0.25, 1], // cubic-bezier für flüssige Animation
  };
  
  return (
    <div 
      ref={bannerRef}
      className="w-full my-12 relative px-4 sm:px-0"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="w-full bg-indigo-900 rounded-2xl overflow-hidden relative will-change-transform"
          animate={{ 
            scale: isAnimated ? 1.01 : 1,
            boxShadow: isAnimated 
              ? '0 30px 60px rgba(0, 0, 0, 0.12), 0 15px 30px rgba(79, 70, 229, 0.2)' 
              : '0 0 0 rgba(0, 0, 0, 0)'
          }}
          style={{
            transformStyle: 'preserve-3d',
            transform: isAnimated 
              ? 'perspective(1000px) rotateX(0.8deg) rotateY(0.5deg)' 
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
          }}
          transition={transition}
        >
          <div className="relative py-6 px-4 pb-0">
            {/* Großer Hintergrundtext "KUNDENGEWINNUNG" - mittig im Banner */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
              animate={{ 
                opacity: isAnimated ? 0.25 : 0.2,
                y: isAnimated ? -3 : 0
              }}
              transition={transition}
            >
              <h2 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white select-none text-center whitespace-nowrap">
                KUNDENGEWINNUNG
              </h2>
            </motion.div>
            
            {/* Oberer Bereich mit Checkmarks links und rechts */}
            <div className="flex flex-col md:flex-row justify-between mb-4 md:mb-6 px-4 md:px-16 relative z-10">
              <motion.div 
                className="flex items-center gap-3 mb-4 md:mb-0"
                animate={{ x: isAnimated ? -3 : 0 }}
                transition={transition}
              >
                <div className="rounded-full bg-white/90 w-8 h-8 flex items-center justify-center">
                  <Check className="w-5 h-5 text-indigo-800" />
                </div>
                <span className="text-indigo-200 text-sm">Mehr lokale Anfragen</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3"
                animate={{ x: isAnimated ? 3 : 0 }}
                transition={transition}
              >
                <div className="rounded-full bg-white/90 w-8 h-8 flex items-center justify-center">
                  <Check className="w-5 h-5 text-indigo-800" />
                </div>
                <span className="text-indigo-200 text-sm">Weniger Kosten</span>
              </motion.div>
            </div>
            
            {/* Portrait im unteren Teil des Banners, mittig, am unteren Rand angeschnitten */}
            <motion.div 
              className="flex justify-center mt-auto mb-0 relative z-10"
              animate={{ y: isAnimated ? -5 : 0 }}
              transition={transition}
            >
              <div className="relative h-[280px] md:h-[320px] w-[280px] md:w-[320px]">
                <Image 
                  src="/images/florian-buchmann.png"
                  alt="Florian Buchmann"
                  fill
                  sizes="320px"
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </motion.div>
            
            {/* Text im unteren linken Bereich */}
            <motion.div 
              className="absolute bottom-[28%] sm:bottom-[20%] left-[5%] max-w-[250px] z-20"
              animate={{ x: isAnimated ? -2 : 0 }}
              transition={transition}
            >
              <p className="text-white text-xs uppercase tracking-wide leading-tight">
                SUCHST DU EINE EINFACHE LÖSUNG, UM MEHR KUNDEN FÜR DEINEN BETRIEB ZU GEWINNEN?
              </p>
            </motion.div>
            
            {/* Call to Action Button - rechts unten */}
            <motion.div 
              className="absolute bottom-[10%] right-[5%] z-20"
              animate={{ x: isAnimated ? 2 : 0 }}
              transition={transition}
            >
              <Link 
                href="/kontakt" 
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium py-3.5 px-7 rounded-lg text-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Jetzt Gespräch vereinbaren</span>
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </motion.div>
            
            {/* Hintergrund-Kreise mit weicheren Übergängen */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <motion.div 
                className="absolute top-[15%] right-[8%] w-[180px] h-[180px] rounded-full bg-indigo-800/30"
                animate={{ x: isAnimated ? 5 : 0, y: isAnimated ? -5 : 0 }}
                transition={transition}
              />
              <motion.div 
                className="absolute bottom-[20%] left-[10%] w-[120px] h-[120px] rounded-full bg-indigo-700/20"
                animate={{ x: isAnimated ? -5 : 0, y: isAnimated ? 5 : 0 }}
                transition={transition}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 