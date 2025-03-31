"use client";

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ActionButtons, ContactButton, ServicesButton } from './ActionButtons';
import Link from 'next/link';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  // Stelle sicher, dass wir nur auf dem Client rendern
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (!isClient) return;
    
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    const updateTime = () => {
      setCurrentTime(videoElement.currentTime);
      
      // Video-Dauer erkennen (sollte etwa 55 Sekunden sein basierend auf den Textanzeigen)
      // Ein leichter Puffer ist eingebaut, um sicherzustellen, dass wir das Ende erkennen
      if (!isMuted && videoElement.currentTime < 1 && currentTime > 50) {
        setIsMuted(true);
        videoElement.muted = true;
      }
    };
    
    videoElement.addEventListener('timeupdate', updateTime);
    
    return () => {
      videoElement.removeEventListener('timeupdate', updateTime);
    };
  }, [isMuted, currentTime, isClient]);
  
  const toggleMute = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      setIsMuted(!isMuted);
      video.muted = !isMuted;
      
      if (isMuted) {
        // Wenn Ton eingeschaltet wird, Video neu starten
        video.currentTime = 0;
        video.play();
      }
    }
  };
  
  // Diese Werte werden nur client-seitig berechnet
  const showFirstText = isClient && currentTime >= 0 && currentTime <= 5;
  const showSecondText = isClient && currentTime >= 5 && currentTime <= 12;
  const showThirdText = isClient && currentTime >= 12 && currentTime <= 15;
  const showFourthText = isClient && currentTime > 15 && currentTime <= 22;
  const showFifthText = isClient && currentTime > 22 && currentTime <= 32;
  const showSixthText = isClient && currentTime > 32 && currentTime <= 43;
  const showSeventhText = isClient && currentTime > 43 && currentTime <= 55;

  // Hilfsfunktion, um den aktiven Textblock zu ermitteln
  const getCurrentText = () => {
    if (!isClient) return "";
    if (showFirstText) return "Neue Kunden bleiben aus?";
    if (showSecondText) return "Bei deiner Konkurrenz läuft es viel besser?";
    if (showThirdText) return "Keine Anfragen über deine Website?";
    if (showFourthText) return "Ich bin Florian von Buchmann Digital und kann dir dabei helfen!";
    if (showFifthText) return "Neue Anfragen in kurzer Zeit";
    if (showSixthText) return "Neue Kundenanfragen kommen automatisch";
    if (showSeventhText) return "Ich erkläre dir alles in einem unverbindlichen Erstgespräch";
    return "";
  };

  const currentText = getCurrentText();

  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-4 pt-24 md:pt-16 pb-16">
        <div className="flex flex-col md:flex-row md:items-stretch gap-2 md:gap-20">
          
          {/* Text und Buttons - auf Mobile zuerst, auf Desktop rechts */}
          <div className="w-full md:w-7/12 md:order-2 md:mt-16 relative">
            <p className="text-indigo-600 font-semibold mb-3 tracking-wide uppercase text-sm">
              Für Handwerksbetriebe und regionale Dienstleister
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Neue Kunden durch höhere Sichtbarkeit
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-700 mb-8">
              Dein Betrieb auf dem Weg zur Nummer 1 in deiner Region
            </p>
            
            <ActionButtons>
              <ContactButton onClick={(e) => {
                e.preventDefault();
                document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
              }} />
              <ServicesButton />
            </ActionButtons>
            
            {/* Sprechblase für Desktop - zeigt nach links */}
            {isClient && currentText && (
              <div className="hidden md:flex relative mt-8">
                <div className="inline-block p-4 bg-white border border-gray-300 rounded-lg shadow-sm max-w-[85%] text-gray-900">
                  <p className="text-lg font-normal whitespace-normal">{currentText}</p>
                  
                  {/* Sprechblasenpfeil mit Tailwind */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 
                                 border-t-[8px] border-t-transparent 
                                 border-b-[8px] border-b-transparent 
                                 border-r-[12px] border-r-gray-300">
                  </div>
                  {/* Zweiter Pfeil für den inneren weißen Teil */}
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 
                                 border-t-[6px] border-t-transparent 
                                 border-b-[6px] border-b-transparent 
                                 border-r-[10px] border-r-white">
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Video - auf Mobile nach den Buttons, auf Desktop links */}
          <div className="w-full md:w-5/12 md:order-1 md:max-w-[400px] mt-2 md:mt-0 md:flex md:flex-col md:justify-end">
            {isClient && (
              <div className="relative">
                <video 
                  ref={videoRef}
                  src="/videos/buchmann-digital.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover rounded-lg aspect-square"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
                
                {/* Ton-Button mit Lucide-Icons */}
                <button 
                  onClick={toggleMute}
                  className="absolute bottom-3 right-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white p-2 rounded-full shadow-md transition-colors"
                  aria-label={isMuted ? "Ton einschalten" : "Ton ausschalten"}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            )}
            
            {/* Für Server-seitiges Rendering - ein Platzhalter */}
            {!isClient && (
              <div className="w-full aspect-square bg-gray-200 rounded-lg"></div>
            )}
            
            {/* Sprechblase für Mobile - zeigt nach oben */}
            {isClient && currentText && (
              <div className="block md:hidden relative mt-4">
                <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-900">
                  <p className="text-base">{currentText}</p>
                  
                  {/* Sprechblasenpfeil nach oben mit Tailwind */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 
                                 border-l-[8px] border-l-transparent 
                                 border-r-[8px] border-r-transparent 
                                 border-b-[12px] border-b-gray-300">
                  </div>
                  {/* Zweiter Pfeil für den inneren weißen Teil */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 
                                 border-l-[6px] border-l-transparent 
                                 border-r-[6px] border-r-transparent 
                                 border-b-[10px] border-b-white">
                  </div>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}