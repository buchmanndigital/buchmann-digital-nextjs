'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';

// Testimonial-Daten
const testimonials = [
  {
    name: 'Nicole Hasel-Gmeinder',
    role: 'Besitzerin eines Kosmetikstudios',
    text: 'Wir als Familienbetrieb sind mit der Betreuung und Umsetzung zur Gestaltung unserer Webseite mit Herrn Buchmann sehr zufrieden. Herr Buchmann konnte sich sehr gut in unsere Themen hineinversetzen und tolle Vorschläge, die wir dann auch gemeinsam umgesetzt haben, machen. Besonders möchte ich seine Geduld gegenüber uns nicht Fachkundigen erwähnen.',
    image: '/images/testimonials/nicole-hasel-gmeinder.png'
  },
  {
    name: 'Cem Alici',
    role: 'Besitzer mehrerer Unternehmen',
    text: 'Ich war mit Herrn Buchmann sehr zufrieden. Ich kann ihn nur noch empfehlen',
    image: '/images/testimonials/cem-alici.png'
  },
  {
    name: 'Daniel Nies',
    role: 'Gründer von Zeichenwerk',
    text: 'Wir sind auch sehr zufrieden mit der Zusammenarbeit und empfehlen Florian Buchmann gerne weiter.',
    image: '/images/testimonials/daniel-nies.png'
  },
  {
    name: 'Marcel Jäger',
    role: 'Geschäftsführer eines Handwerksbetriebes',
    text: 'Die neue Website hat unsere Online-Präsenz komplett verändert. Die Kundenanfragen sind direkt gestiegen.',
    image: '/images/testimonials/marcel-jaeger.png'
  }
];

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);

  // Framer Motion Werte für Scroll-Indikator
  const x = useMotionValue(0);
  const dragProgress = useTransform(x, [0, 100], [0, 100]);

  // Intersection Observer für Animations-Trigger
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Prüfen, ob Inhalt größer als Container ist (also scrollbar sein sollte)
  useEffect(() => {
    const checkIfScrollable = () => {
      if (scrollContainerRef.current) {
        const isContentWiderThanContainer = 
          scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth;
        setIsScrollable(isContentWiderThanContainer);
      }
    };

    // Initial prüfen
    checkIfScrollable();
    
    // Auch bei Größenänderung prüfen
    window.addEventListener('resize', checkIfScrollable);
    
    return () => {
      window.removeEventListener('resize', checkIfScrollable);
    };
  }, []);

  // Maus-Drag Funktionen
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current || !isScrollable) return;
    
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    
    document.body.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current || !isScrollable) return;
    
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Schnelligkeit des Scrollens
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      document.body.style.cursor = 'default';
    }
  };

  // Touch-Funktionen für mobile Geräte
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current || !isScrollable) return;
    
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current || !isScrollable) return;
    
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Update Scroll-Indikator beim Scrollen
  const handleScroll = () => {
    if (!scrollContainerRef.current || !isScrollable) return;
    
    const scrollContainer = scrollContainerRef.current;
    const scrollPercentage = (scrollContainer.scrollLeft / (scrollContainer.scrollWidth - scrollContainer.clientWidth)) * 100;
    
    x.set(scrollPercentage);
  };

  return (
    <section className="bg-indigo-900 py-16 md:py-24 relative overflow-hidden" id="bewertungen">
      {/* Hintergrund-Dekorationen */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Großer Hintergrundtext */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white/10 select-none text-center whitespace-nowrap">
            ERFAHRUNGEN
          </h2>
        </div>
        
        {/* Hintergrund-Kreise */}
        <motion.div 
          className="absolute top-[15%] right-[8%] w-[180px] h-[180px] rounded-full bg-indigo-800/30"
          animate={{ x: isInView ? 5 : 0, y: isInView ? -5 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[20%] left-[10%] w-[120px] h-[120px] rounded-full bg-indigo-700/20"
          animate={{ x: isInView ? -5 : 0, y: isInView ? 5 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[60%] left-[25%] w-[150px] h-[150px] rounded-full bg-indigo-600/10"
          animate={{ x: isInView ? 8 : 0, y: isInView ? -8 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Was Menschen wie du über <span className="text-indigo-300">Buchmann Digital</span> sagen
          </h2>
        </motion.div>
      </div>
      
      {/* Testimonials Container */}
      <div 
        ref={containerRef}
        className="relative max-w-[100vw] overflow-hidden pb-12 z-10"
      >
        <div 
          ref={scrollContainerRef}
          className={`flex gap-6 px-4 md:px-6 lg:px-8 pb-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory ${!isScrollable ? 'justify-center' : ''}`}
          onScroll={handleScroll}
          onMouseDown={isScrollable ? handleMouseDown : undefined}
          onMouseMove={isScrollable ? handleMouseMove : undefined}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={isScrollable ? handleTouchStart : undefined}
          onTouchMove={isScrollable ? handleTouchMove : undefined}
          onTouchEnd={handleMouseUp}
          style={{ 
            cursor: isScrollable ? (isDragging ? 'grabbing' : 'grab') : 'default',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 min-w-[300px] max-w-[350px] flex-shrink-0 snap-center flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Sterne-Bewertung */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 flex-grow">
                "{testimonial.text}"
              </p>
              
              {/* Person Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 relative">
                  <Image 
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-indigo-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll-Indikator - nur anzeigen, wenn scrollbar */}
        {isScrollable && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-1 bg-indigo-800/40 rounded-full w-full max-w-md mx-auto mt-4">
              <motion.div 
                className="h-1 bg-indigo-300 rounded-full"
                style={{ width: `${dragProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* CSS für versteckte Scrollbar */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
} 