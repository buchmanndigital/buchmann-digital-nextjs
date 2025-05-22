'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Clock, CheckCircle, Calendar } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function DiagonalLine() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 800L1200 0"
          stroke="url(#lineGradient)"
          strokeWidth="800"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient
            id="lineGradient"
            x1="0"
            y1="800"
            x2="1200"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#ECFCCB" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#86EFAC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Counter({ from = 0, to = 100, duration = 2 }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  useEffect(() => {
    const controls = animate(count, to, {
      duration: duration,
      delay: 2,
      ease: "easeOut",
    });
    return controls.stop;
  }, [count, to, duration]);

  return <motion.span>{rounded}</motion.span>;
}

function TimelinePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-white rounded-lg shadow-2xl overflow-hidden relative h-full"
    >
      {/* Animated Background Line */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200"
          style={{
            backgroundSize: '200% 100%',
            animation: 'moveGradient 15s linear infinite'
          }}
        />
      </div>

      <div className="relative p-6 bg-white/90 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold">Entwicklungszeit</h3>
        </div>

        <div className="space-y-8 flex-grow flex flex-col justify-center">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Traditionell</span>
              <span className="text-sm font-medium">4-6 Wochen</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <motion.div
                className="h-full w-full bg-gray-300 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Mit Buchmann Digital</span>
              <span className="text-sm font-medium text-blue-600">1-5 Tage</span>
            </div>
            <div className="h-2 bg-blue-50 rounded-full">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '20%' }}
                transition={{ duration: 2, delay: 2, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="pt-4">
            <div className="flex items-center gap-2 text-blue-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">
                Bis zu <Counter from={0} to={85} duration={2} />% schneller
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CodePreview() {
  const code = [
    { content: 'export function default Hero() {', indent: 0 },
    { content: 'return (', indent: 1 },
    { content: '<section className="min-h-screen">', indent: 2 },
    { content: '<div className="container mx-auto">', indent: 3 },
    { content: '<h1 className="text-6xl font-bold">', indent: 4 },
    { content: 'Willkommen auf unserer Seite', indent: 5 },
    { content: '</h1>', indent: 4 },
    { content: '<button className="bg-blue-600">', indent: 4 },
    { content: 'Los geht`s!', indent: 5 },
    { content: '</button>', indent: 4 },
    { content: '</div>', indent: 3 },
    { content: '</section>', indent: 2 },
    { content: ');', indent: 1 },
    { content: '}', indent: 0 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-[#1D2433] rounded-lg shadow-2xl overflow-hidden"
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-[#1D2433]/50 border-b border-gray-700">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <div className="p-4 font-mono text-sm">
        {code.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            className="flex"
          >
            <span className="w-8 text-gray-500">{index + 1}</span>
            <span className="flex-1" style={{ paddingLeft: `${line.indent * 20}px` }}>
              {line.content.split(' ').map((word, wordIndex, words) => {
                if (word.startsWith('export') || word.startsWith('function') || word === 'return') {
                  return <span key={wordIndex} className="text-blue-400">{word} </span>;
                }
                if (word === 'className') {
                  return <span key={wordIndex} className="text-purple-400">{word}</span>;
                }
                if (word.startsWith('"') && words[wordIndex - 1] === 'className=') {
                  return <span key={wordIndex} className="text-green-400">{word}</span>;
                }
                if (word.includes('</') || word.includes('/>') || word === '>' || word === '<') {
                  return <span key={wordIndex} className="text-gray-400">{word} </span>;
                }
                return <span key={wordIndex} className="text-white">{word} </span>;
              })}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function Hero() {
  const router = useRouter();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[400px] flex items-center px-4">
      <DiagonalLine />
      <div className="container mx-auto max-w-6xl relative z-10 mt-16">
        <div className="max-w-3xl pt-[50px]">
          <div className="inline-flex items-center gap-2 bg-[#1D2433]/10 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-[#1D2433]" />
            <span className="text-[#1D2433] text-sm font-medium">Für Agenturen</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            <span className="block">Webprojekte für Ihre Kunden </span>
            <span className="block">in wenigen Tagen statt Wochen</span>
          </h1>

          <p className="text-xl text-slate-600 mb-8 max-w-2xl">
            Technische Umsetzung für Agenturen, die mehr Aufträge effizient abwickeln möchten – 
            ohne interne Ressourcen zu binden.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={scrollToContact}
              className="bg-[#1D2433] hover:bg-[#1D2433]/90 text-white group"
            >
              Jetzt unverbindlich anfragen
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              className="border-[#1D2433] text-[#1D2433] group"
              onClick={() => router.push('/fast/buchen')}
            >
              <Calendar className="mr-2 w-4 h-4" />
              Termin vereinbaren
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 translate-y-16">
          <div className="relative">
            <CodePreview />
          </div>
          <div className="relative">
            <TimelinePreview />
          </div>
        </div>
      </div>
    </section>
  );
}