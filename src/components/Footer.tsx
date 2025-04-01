'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Instagram, Linkedin, Mail, Send, AlertCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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

export function Footer() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', company: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <footer className="relative bg-indigo-900 text-white overflow-hidden" id="kontakt">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={boxVariants}
        >
          {/* Linke Seite - Kontaktformular */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} custom={0}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Lass uns über dein Projekt sprechen
              </h2>
              <p className="text-indigo-200 text-lg">
                Ich freue mich darauf, von dir zu hören und gemeinsam deinen Betrieb zur Nummer 1 in deiner Region zu machen.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} custom={1}>
                  <label htmlFor="firstName" className="block text-sm font-medium text-indigo-200 mb-2">
                    Vorname
                  </label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="bg-indigo-800/80 border-indigo-600 text-white placeholder:text-indigo-300/70 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
                    placeholder="Max"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants} custom={1}>
                  <label htmlFor="lastName" className="block text-sm font-medium text-indigo-200 mb-2">
                    Nachname
                  </label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="bg-indigo-800/80 border-indigo-600 text-white placeholder:text-indigo-300/70 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
                    placeholder="Mustermann"
                    required
                  />
                </motion.div>
              </div>

              <motion.div variants={itemVariants} custom={2}>
                <label htmlFor="email" className="block text-sm font-medium text-indigo-200 mb-2">
                  E-Mail
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-indigo-800/80 border-indigo-600 text-white placeholder:text-indigo-300/70 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
                  placeholder="max@example.com"
                  required
                />
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} custom={3}>
                  <label htmlFor="company" className="block text-sm font-medium text-indigo-200 mb-2">
                    Unternehmensname <span className="text-indigo-400">(optional)</span>
                  </label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-indigo-800/80 border-indigo-600 text-white placeholder:text-indigo-300/70 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
                    placeholder="Dein Unternehmen"
                  />
                </motion.div>

                <motion.div variants={itemVariants} custom={3}>
                  <label htmlFor="phone" className="block text-sm font-medium text-indigo-200 mb-2">
                    Telefonnummer <span className="text-indigo-400">(optional)</span>
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-indigo-800/80 border-indigo-600 text-white placeholder:text-indigo-300/70 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
                    placeholder="+49 123 456789"
                  />
                </motion.div>
              </div>

              <motion.div variants={itemVariants} custom={4}>
                <label htmlFor="message" className="block text-sm font-medium text-indigo-200 mb-2">
                  Nachricht
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-indigo-800/80 border-indigo-600 text-white placeholder:text-indigo-300/70 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[150px] text-base"
                  placeholder="Erzähle mir von deinem Projekt..."
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} custom={5}>
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className={cn(
                    "group flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-indigo-700 font-medium py-3.5 px-7 rounded-lg text-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-70",
                    status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''
                  )}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                >
                  <span>
                    {status === 'sending' ? 'Wird gesendet...' : 'Nachricht senden'}
                  </span>
                  <ArrowRight 
                    className={cn(
                      "w-4 h-4 ml-1 transition-all duration-300",
                      isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                    )}
                  />
                </motion.button>
              </motion.div>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-indigo-800/50 border border-indigo-700 text-indigo-100 p-4 rounded-lg"
                >
                  Deine Nachricht wurde erfolgreich gesendet. Ich melde mich in Kürze bei dir!
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-900/50 border border-red-700 text-red-100 p-4 rounded-lg flex items-center gap-2"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.</span>
                </motion.div>
              )}
            </form>
          </div>

          {/* Rechte Seite - Kontaktinfos & Social Media */}
          <div className="lg:pl-16 space-y-12">
            <motion.div variants={itemVariants} custom={0}>
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src="/images/buchmann-digital-logo.png"
                  alt="Buchmann Digital Logo"
                  width={25}
                  height={25}
                  className="invert"
                />
                <h3 className="text-2xl font-bold text-white">
                  Buchmann Digital
                </h3>
              </div>
              <p className="text-indigo-200">
                Digital Consultant & Webentwickler aus dem Allgäu
              </p>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants} custom={1}>
              <a 
                href="mailto:info@buchmann.digital"
                className="flex items-center gap-3 text-indigo-200 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@buchmann.digital
              </a>

              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/florianbuchmann/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-indigo-800/50 rounded-lg hover:bg-indigo-700/50 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/florian-buchmann-9764771b4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-indigo-800/50 rounded-lg hover:bg-indigo-700/50 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="pt-12 mt-12 border-t border-indigo-800"
              variants={itemVariants}
              custom={2}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-sm text-indigo-300">
                  © {new Date().getFullYear()} Buchmann Digital. Alle Rechte vorbehalten.
                </p>
                <div className="flex items-center gap-6">
                  <Link 
                    href="/impressum" 
                    className="text-sm text-indigo-300 hover:text-white transition-colors"
                  >
                    Impressum
                  </Link>
                  <Link 
                    href="/datenschutz" 
                    className="text-sm text-indigo-300 hover:text-white transition-colors"
                  >
                    Datenschutz
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}