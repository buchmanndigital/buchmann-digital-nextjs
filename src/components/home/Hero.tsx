"use client";

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ActionButtons, ContactButton, ServicesButton } from './ActionButtons';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    const updateTime = () => {
      setCurrentTime(videoElement.currentTime);
    };
    
    videoElement.addEventListener('timeupdate', updateTime);
    
    return () => {
      videoElement.removeEventListener('timeupdate', updateTime);
    };
  }, []);
  
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
  
  const showFirstText = currentTime >= 0 && currentTime <= 5;
  const showSecondText = currentTime >= 5 && currentTime <= 12;
  const showThirdText = currentTime >= 12 && currentTime <= 15;
  const showFourthText = currentTime > 15 && currentTime <= 22;
  const showFifthText = currentTime > 22 && currentTime <= 32;
  const showSixthText = currentTime > 32 && currentTime <= 43;
  const showSeventhText = currentTime > 43 && currentTime <= 55;

  // Hilfsfunktion, um den aktiven Textblock zu ermitteln
  const getCurrentText = () => {
    if (showFirstText) return "Du gibst alles für deinen Betrieb, doch neue Kunden bleiben aus?";
    if (showSecondText) return "Bei deiner Konkurrenz läuft es viel besser?";
    if (showThirdText) return "Keine Anfragen über deine Website?";
    if (showFourthText) return "Hi, ich bin Florian von Buchmann Digital und kann dir dabei helfen!";
    if (showFifthText) return "Neue Anfragen in kurzer Zeit";
    if (showSixthText) return "Neue Kundenanfragen kommen automatisch";
    if (showSeventhText) return "Ich erkläre dir gerne alles in einem unverbindlichen Erstgespräch";
    return "";
  };

  const currentText = getCurrentText();

  return (
    <div className="bg-white text-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-20">
          
          {/* Text und Buttons - auf Mobile zuerst, auf Desktop rechts */}
          <div className="w-full md:w-7/12 md:order-2 md:mt-16 relative">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Neue Kunden durch höhere Sichtbarkeit
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-700 mb-8">
              Dein Betrieb auf dem Weg zur Nummer 1 in deiner Region
            </p>
            
            <ActionButtons>
              <ContactButton />
              <ServicesButton />
            </ActionButtons>
            
            {/* Sprechblase für Desktop - zeigt nach links */}
            {currentText && (
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
          <div className="w-full md:w-5/12 md:order-1 md:max-w-[400px] mt-8 md:mt-0">
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
                className="absolute bottom-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                aria-label={isMuted ? "Ton einschalten" : "Ton ausschalten"}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-gray-700" />
                ) : (
                  <Volume2 className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>
            
            {/* Sprechblase für Mobile - zeigt nach oben */}
            {currentText && (
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