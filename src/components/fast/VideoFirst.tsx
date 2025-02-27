import React, { useState, useRef, useEffect } from 'react';
import { Users, Calendar, CalendarDays, Clock, Zap } from 'lucide-react';

const VideoFirst: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [bulletPoints, setBulletPoints] = useState<string[]>([]);
  const [showButton, setShowButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Video-Observer: Video wird nur abgespielt, wenn es im Viewport ist
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      });
    };

    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Synchronisation der Texte und Bulletpoints zur Videolaufzeit
  useEffect(() => {
    const handleTimeUpdate = () => {
      if (!videoRef.current) return;
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;

      if (currentTime < 2 || currentTime >= duration - 2) {
        setDisplayText('');
        setBulletPoints([]);
      } else if (currentTime >= 40) {
        setDisplayText('Schneller und Effizienter!');
        setBulletPoints([]);
        if (!showButton) {
          setShowButton(true);
        }
      } else if (currentTime >= 34) {
        setDisplayText('Schneller und Effizienter!');
        setBulletPoints([]);
      } else if (currentTime >= 20) {
        setDisplayText('Nur 4 Stunden!');
        if (currentTime >= 25) {
          setBulletPoints(["Content Creation", "Design", "Umsetzung", "Hosting"]);
        } else if (currentTime >= 24) {
          setBulletPoints(["Content Creation", "Design"]);
        } else if (currentTime >= 22) {
          setBulletPoints(["Content Creation"]);
        } else {
          setBulletPoints([]);
        }
      } else if (currentTime >= 13) {
        setDisplayText('Zwei Wochen?');
        setBulletPoints([]);
      } else if (currentTime >= 12) {
        setDisplayText('Eine Woche?');
        setBulletPoints([]);
      } else {
        setDisplayText('Agenturbesitzer?');
        setBulletPoints([]);
      }
    };

    const videoEl = videoRef.current;
    videoEl?.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      videoEl?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [showButton]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !videoRef.current.muted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <div className="container mx-auto px-4">
      {/* Auf Mobilgeräten (small) als flex-col, ab md als row; 
          Textcontainer oben auf mobil mit order-1, Video unten (order-2) */}
      <div className="max-w-6xl flex flex-col md:flex-row mx-auto">
        {/* Textcontainer */}
        <div className="w-full md:w-2/3 order-1 md:order-2 flex flex-col items-center justify-center mb-4 md:mb-0">
          {displayText && (
            <div className="flex items-center mb-4">
              {displayText === 'Agenturbesitzer?' && <Users className="mr-2" />}
              {displayText === 'Eine Woche?' && <Calendar className="mr-2" />}
              {displayText === 'Zwei Wochen?' && <CalendarDays className="mr-2" />}
              {displayText === 'Nur 4 Stunden!' && <Clock className="mr-2" />}
              {displayText === 'Schneller und Effizienter!' && <Zap className="mr-2" />}
              <p className="text-xl font-bold">{displayText}</p>
            </div>
          )}
          {bulletPoints.length > 0 && (
            <ul className="list-disc list-inside mb-4">
              {bulletPoints.map((point, index) => (
                <li key={index} className="text-lg">{point}</li>
              ))}
            </ul>
          )}
          {showButton && (
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-[#1D2433] hover:bg-[#1D2433]/90 text-white font-bold py-2 px-4 rounded"
            >
              Jetzt unverbindlich anfragen
            </button>
          )}
        </div>
        {/* Video-Container */}
        <div className="w-full md:w-1/3 relative order-2 md:order-1">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            // Alternativ für ältere iOS-Versionen:
            // webkit-playsinline
            width="100%"
            className="w-full"
          >
            <source src="/videos/first-video-2.mp4" type="video/mp4" />
            Ihr Browser unterstützt das Video-Tag nicht.
          </video>
          <div className="absolute top-2 left-2 flex gap-2">
            <button 
              type="button" 
              onClick={togglePlay} 
              className="bg-white p-2 rounded-full shadow"
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" 
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M10 9v6m4-6v6" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" 
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M14.752 11.168l-5.197-3.034A1 1 0 008 9.034v5.932a1 1 0 001.555.832l5.197-3.034a1 1 0 000-1.664z" />
                </svg>
              )}
            </button>
            <button 
              type="button" 
              onClick={toggleMute} 
              className="bg-white p-2 rounded-full shadow"
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" 
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15.536 8.464a5 5 0 010 7.071" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M19.07 4.93a9 9 0 010 14.14" />
                  <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" 
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15.536 8.464a5 5 0 010 7.071M19.07 4.93a9 9 0 010 14.14" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoFirst;