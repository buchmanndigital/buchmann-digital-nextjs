'use client';

import { motion } from 'framer-motion';
import { Flag, Search, Computer, Megaphone } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

// Roadmap-Schritte definieren
const roadmapSteps = [
  {
    id: 1,
    title: 'Kundenanalyse',
    icon: Search,
    color: 'bg-indigo-600',
    description: 'Wir analysieren deine Zielgruppe und identifizieren potenzielle Kunden in deiner Region.',
    position: { x: '10%', y: '22%' }
  },
  {
    id: 2,
    title: 'Digitale Strategie',
    icon: Computer,
    color: 'bg-indigo-600',
    description: 'Wir entwickeln eine maßgeschneiderte Strategie für deine Online-Präsenz und Kundengewinnung.',
    position: { x: '36%', y: '30%' }
  },
  {
    id: 3,
    title: 'Marketing Optimierung',
    icon: Megaphone,
    color: 'bg-indigo-600',
    description: 'Durch gezieltes Marketing machen wir dein Angebot für potenzielle Kunden sichtbar.',
    position: { x: '65%', y: '33%' }
  },
  {
    id: 4,
    title: 'Messbare Ergebnisse',
    icon: Flag,
    color: 'bg-indigo-600',
    description: 'Du erhältst kontinuierlich neue Kundenanfragen und siehst den Erfolg in messbaren Zahlen.',
    position: { x: '90%', y: '26%' }
  }
];

export function RoadmapSection() {
  const roadmapRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Prüfen, ob Roadmap im Viewport ist
  useEffect(() => {
    if (!roadmapRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(roadmapRef.current);

    return () => {
      if (roadmapRef.current) {
        observer.unobserve(roadmapRef.current);
      }
    };
  }, []);

  // Mobilansicht erkennen
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden" id="roadmap">
      {/* SVG-Linie über den gesamten Bildschirm - nur für Desktop */}
      <div className="absolute w-full h-full overflow-hidden hidden md:block">
        <div className="absolute w-[300vw] h-[300px] top-[49%] -translate-y-1/2 left-[-10vw] right-0">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 3000 100" 
            preserveAspectRatio="none"
            style={{ display: 'block' }}
          >
            <motion.path
              d="M 0,35 C 300,10 600,70 900,35 C 1200,10 1500,70 1800,35 C 2100,10 2400,70 3000,35"
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: isVisible ? 1 : 0,
                opacity: isVisible ? 1 : 0.3
              }}
              transition={{ 
                duration: 1.5, 
                ease: "easeInOut"
              }}
            />
          </svg>
        </div>
      </div>

      {/* 3D Figur */}
      <div className="absolute md:left-[30%] right-[5%] md:right-auto bottom-0 z-20 pointer-events-none">
        <Image
          src="/images/home/florian-buchmann-3d-top-right.png"
          alt="Florian Buchmann 3D"
          width={300}
          height={400}
          className="object-contain w-[150px] md:w-[200px] scale-x-[-1] md:scale-x-[1]"
          priority
        />
      </div>
      
      {/* Content Container mit maximalem Content-Bereich */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            Dein Weg zu mehr <span className="text-indigo-600">Kunden</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            In vier einfachen Schritten zu mehr lokalen Anfragen und weniger Werbekosten
          </p>
        </div>

        {/* Roadmap Container mit Punkten */}
        <div 
          ref={roadmapRef}
          className="relative w-full md:h-[300px] h-[600px] mt-8 md:mt-20"
        >
          {/* Desktop Roadmap mit Punkten */}
          <div className="hidden md:block relative w-full h-full">
            {/* Desktop Punkte entlang des Pfades */}
            {roadmapSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="absolute cursor-pointer"
                style={{
                  left: step.position.x,
                  top: step.position.y,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isVisible ? 1 : 0,
                  y: isVisible ? 0 : 20
                }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.2 + 0.5
                }}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className="relative">
                  {/* Punkt */}
                  <div className={`w-14 h-14 rounded-full ${step.color} flex items-center justify-center shadow-md`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Titel darunter */}
                  <div className="absolute top-full mt-3 w-40 -left-12 text-center">
                    <h3 className="font-bold text-indigo-900 text-sm md:text-base">{step.title}</h3>
                  </div>
                  
                  {/* Popup bei Hover */}
                  <motion.div
                    className="absolute w-64 bg-white rounded-lg p-4 shadow-lg z-20"
                    style={{
                      top: index % 2 === 0 ? "140%" : "-130%",
                      left: "-100px"
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: activeStep === step.id ? 1 : 0,
                      scale: activeStep === step.id ? 1 : 0.8,
                      pointerEvents: activeStep === step.id ? "auto" : "none"
                    }}
                    transition={{ 
                      duration: 0.2
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${step.color} flex-shrink-0`}>
                        <step.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{step.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile Roadmap als vertikale Timeline */}
          <div className="md:hidden relative flex flex-col items-start">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-200" />
            
            {roadmapSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative pl-12 mb-12"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isVisible ? 1 : 0,
                  x: isVisible ? 0 : -20
                }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.15 + 0.3
                }}
              >
                <div className="absolute left-0 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <step.icon className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="font-bold text-indigo-700">{step.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 