'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BadgeCheck, Mail, Send, Building, User, MapPin, RefreshCw, ChevronLeft, ChevronRight, Rocket, Globe, Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Vordefinierte Kreise mit festen Positionen und Größen für konsistentes Rendering
const backgroundCircles = [
  { width: 110, height: 150, top: 25, left: 15 },
  { width: 160, height: 120, top: 60, left: 35 },
  { width: 130, height: 180, top: 40, left: 65 },
  { width: 200, height: 110, top: 75, left: 85 },
  { width: 120, height: 200, top: 10, left: 45 },
  { width: 170, height: 130, top: 85, left: 25 },
  { width: 150, height: 160, top: 35, left: 75 },
  { width: 190, height: 140, top: 55, left: 55 },
  { width: 140, height: 190, top: 20, left: 95 },
  { width: 180, height: 170, top: 70, left: 5 }
];

// Animationsvarianten für Seitenübergänge
const pageVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    },
  }),
};

// Typen für die Formularschritte
type FormStep = 'intro' | 'company' | 'website' | 'contact' | 'success';

export function FreeAnalysis() {
  const [currentStep, setCurrentStep] = useState<FormStep>('intro');
  const [direction, setDirection] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Formulardaten
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [hasWebsite, setHasWebsite] = useState<'yes' | 'no' | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Progress-Berechnung
  useEffect(() => {
    const steps: FormStep[] = ['intro', 'company', 'website', 'contact', 'success'];
    const currentIndex = steps.indexOf(currentStep);
    setProgress((currentIndex / (steps.length - 1)) * 100);
  }, [currentStep]);
  
  // Nur auf dem Client rendern
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Navigation zwischen den Schritten
  const goToNextStep = () => {
    setDirection(1);
    if (currentStep === 'intro') setCurrentStep('company');
    else if (currentStep === 'company') setCurrentStep('website');
    else if (currentStep === 'website') setCurrentStep('contact');
    else if (currentStep === 'contact') handleSubmit();
  };
  
  const goToPrevStep = () => {
    setDirection(-1);
    if (currentStep === 'company') setCurrentStep('intro');
    else if (currentStep === 'website') setCurrentStep('company');
    else if (currentStep === 'contact') setCurrentStep('website');
  };
  
  // Formular kann fortgesetzt werden wenn...
  const canContinue = () => {
    if (currentStep === 'intro') return true;
    if (currentStep === 'company') return !!companyName;
    if (currentStep === 'website') return hasWebsite !== null;
    if (currentStep === 'contact') return !!contactInfo;
    return false;
  };
  
  // Submit Handler
  const handleSubmit = async () => {
    if (!companyName || !contactInfo) {
      alert('Unternehmensname und Kontaktinformation sind erforderlich');
      return;
    }
    
    setStatus('sending');
    
    try {
      const res = await fetch('/api/free-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactName,
          email: contactInfo,
          phone: contactInfo.includes('@') ? '' : contactInfo,
          company: companyName,
          website: hasWebsite === 'yes' ? websiteUrl : '',
          industry: '', // Wird in der API nicht verwendet
          goals: 'Kostenlose Unternehmensanalyse',
          budget: 'Noch nicht festgelegt',
          message: `Adresse: ${address}`
        }),
      });
      
      if (res.ok) {
        setStatus('success');
        setCurrentStep('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };
  
  // Animation Varianten
  const boxVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.4
      } 
    })
  };
  
  const buttonVariants = {
    idle: { 
      background: "linear-gradient(135deg, rgb(99 102 241) 0%, rgb(79 70 229) 100%)",
    },
    hover: { 
      background: "linear-gradient(135deg, rgb(109 112 251) 0%, rgb(89 80 239) 100%)",
    }
  };
  
  // Vorteile für die Seitenleiste
  const benefitItems = [
    { icon: <BadgeCheck className="w-5 h-5 text-indigo-400" />, text: "Detaillierte Analyse deiner Online-Präsenz" },
    { icon: <RefreshCw className="w-5 h-5 text-indigo-400" />, text: "Konkurrenzanalyse deiner Wettbewerber" },
    { icon: <BadgeCheck className="w-5 h-5 text-indigo-400" />, text: "Maßgeschneiderte Handlungsempfehlungen" },
    { icon: <BadgeCheck className="w-5 h-5 text-indigo-400" />, text: "Keine versteckten Kosten oder Verpflichtungen" }
  ];
  
  // Hilfsfunktion zum Rendern der Navigationstasten
  const renderNavButtons = () => {
    return (
      <div className="flex justify-between mt-8">
        {currentStep !== 'intro' && currentStep !== 'success' && (
          <motion.button
            type="button"
            onClick={goToPrevStep}
            className="flex items-center px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Zurück
          </motion.button>
        )}
        
        {currentStep !== 'success' && (
          <motion.button
            type="button"
            onClick={goToNextStep}
            disabled={!canContinue() || status === 'sending'}
            className={cn(
              "group flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium py-3.5 px-7 rounded-lg text-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ml-auto",
              (!canContinue() || status === 'sending') ? "opacity-70 hover:from-indigo-600 hover:to-indigo-700 transform-none" : ""
            )}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center">
              {status === 'sending' ? 
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> :
                currentStep === 'contact' ? 
                  <Send className="w-5 h-5 mr-2" /> : 
                  null
              }
              {currentStep === 'contact' 
                ? (status === 'sending' ? 'Wird gesendet...' : 'Analyse anfordern') 
                : 'Weiter'}
            </span>
            <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </motion.button>
        )}
      </div>
    );
  };
  
  // Rendering für jeden Schritt
  const renderStep = () => {
    return (
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={currentStep}
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute top-0 left-0 w-full h-full"
        >
          {currentStep === 'intro' && (
            <div className="h-full flex flex-col justify-center">
              <motion.div 
                className="mb-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              >
                <motion.div 
                  className="w-20 h-20 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, transition: { delay: 0.3 } }}
                >
                  <Rocket className="w-10 h-10 text-indigo-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Der erste Schritt zu mehr Kunden
                </h3>
                <p className="text-gray-600 mb-8">
                  Wir erstellen für dich kostenlos eine maßgeschneiderte Analyse. Entdecke versteckte Potenziale und gewinne neue Kunden!
                </p>
                
                <div className="flex justify-center">
                  <motion.button
                    onClick={goToNextStep}
                    className="group flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium py-3.5 px-7 rounded-lg text-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Kostenlose Analyse starten</span>
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
          
          {currentStep === 'company' && (
            <div className="space-y-6">
              <motion.div 
                custom={0} 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Unternehmensname*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="company"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="pl-10"
                    placeholder="Dein Unternehmen GmbH"
                    required
                  />
                </div>
              </motion.div>
              
              <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="pl-10"
                    placeholder="Musterstraße 123, 12345 Musterstadt"
                  />
                </div>
              </motion.div>
              
              {renderNavButtons()}
            </div>
          )}
          
          {currentStep === 'website' && (
            <div className="space-y-6">
              <motion.div 
                custom={0} 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="mb-8"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Hast du bereits eine Website?
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className={cn(
                      "border p-4 rounded-lg flex items-center gap-3 cursor-pointer hover:border-indigo-300 transition-colors",
                      hasWebsite === 'yes' ? "border-indigo-500 bg-indigo-50" : "border-gray-200"
                    )}
                    onClick={() => setHasWebsite('yes')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center",
                      hasWebsite === 'yes' ? "bg-indigo-500" : "border border-gray-300"
                    )}>
                      {hasWebsite === 'yes' && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <span>Ja</span>
                  </motion.div>
                  
                  <motion.div
                    className={cn(
                      "border p-4 rounded-lg flex items-center gap-3 cursor-pointer hover:border-indigo-300 transition-colors",
                      hasWebsite === 'no' ? "border-indigo-500 bg-indigo-50" : "border-gray-200"
                    )}
                    onClick={() => setHasWebsite('no')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center",
                      hasWebsite === 'no' ? "bg-indigo-500" : "border border-gray-300"
                    )}>
                      {hasWebsite === 'no' && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <span>Nein</span>
                  </motion.div>
                </div>
              </motion.div>
              
              {hasWebsite === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="website-url" className="block text-sm font-medium text-gray-700 mb-2">
                    Deine Website-URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="website-url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="pl-10"
                      placeholder="https://www.example.com"
                    />
                  </div>
                </motion.div>
              )}
              
              {renderNavButtons()}
            </div>
          )}
          
          {currentStep === 'contact' && (
            <div className="space-y-6">
              <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible">
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Ansprechpartner
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="contact-name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="pl-10"
                    placeholder="Max Mustermann"
                  />
                </div>
              </motion.div>
              
              <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible">
                <label htmlFor="contact-info" className="block text-sm font-medium text-gray-700 mb-2">
                  E-Mail oder Telefonnummer*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="contact-info"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    className="pl-10"
                    placeholder="info@example.com oder 01234 567890"
                    required
                  />
                </div>
              </motion.div>
              
              {renderNavButtons()}
              
              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded-md"
                >
                  Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.
                </motion.div>
              )}
            </div>
          )}
          
          {currentStep === 'success' && (
            <div className="h-full flex flex-col justify-center items-center text-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
              >
                <Check className="w-10 h-10 text-green-600" />
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                className="text-2xl font-bold text-gray-900 mb-4"
              >
                Vielen Dank!
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                className="text-gray-600 max-w-md"
              >
                Deine Anfrage wurde erfolgreich gesendet. Wir beginnen umgehend mit der Analyse und melden uns innerhalb von 24 Stunden bei dir.
              </motion.p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };
  
  return (
    <section className="relative overflow-hidden">
      {/* Hintergrundbild mit Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/home/schreinerei.jpg")' }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* 3D Figur */}
      <div className="absolute right-0 md:right-[12%] bottom-0 z-20 pointer-events-none">
        <Image
          src="/images/home/florian-buchmann-3d-left.png"
          alt="Florian Buchmann 3D"
          width={300}
          height={400}
          className="object-contain w-[200px] md:w-[300px]"
          priority
        />
      </div>
      
      <div className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={boxVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Der erste Schritt zu mehr Kunden
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Kostenlose Unternehmensanalyse: Erfahre, wie du deine Online-Präsenz 
              optimieren und gezielt neue Kunden gewinnen kannst
            </p>
          </motion.div>
          
          {/* Formular */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={boxVariants}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 relative z-10"
          >
            {/* Progress Bar */}
            {currentStep !== 'intro' && (
              <div className="mb-8">
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>Unternehmen</span>
                  <span>Website</span>
                  <span>Kontakt</span>
                </div>
              </div>
            )}
            
            {/* Dynamic Form Content */}
            <div className="relative h-[350px]">
              {renderStep()}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 