'use client';

import { motion } from 'framer-motion';
import { Rocket, Shield, Target, Users, Code, Zap } from 'lucide-react';

const features = [
  {
    icon: Rocket,
    title: 'Schnelle Umsetzung',
    description: 'Professionelle Entwicklung Ihrer Kundenprojekte in wenigen Tagen statt Wochen.'
  },
  {
    icon: Shield,
    title: 'White-Label',
    description: 'Ihre Kunden sehen Sie als Entwickler – perfekte Integration in Ihre Agenturprozesse.'
  },
  {
    icon: Target,
    title: 'Optimierte Prozesse',
    description: 'Weniger Korrekturschleifen durch strukturierte Workflows und klare Kommunikation.'
  },
  {
    icon: Users,
    title: 'Mehr Kapazität',
    description: 'Realisieren Sie mehr Projekte ohne zusätzliches Personal einzustellen.'
  },
  {
    icon: Code,
    title: 'Technisch sauber',
    description: 'SEO-optimiert, performant und nach modernsten Standards entwickelt.'
  },
  {
    icon: Zap,
    title: 'Flexibel skalierbar',
    description: 'Von einfachen Business-Websites bis zu komplexen Projekten.'
  }
];

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 relative">
            {/* Horizontal divider for larger screens */}
            <div className="absolute hidden lg:block left-0 right-0 top-1/2 h-px bg-gray-200" />
            
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="p-8 relative"
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#ecfccb]">
                  <feature.icon className="w-6 h-6 text-[#1D2433]" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-[#1D2433]">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}