'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock } from 'lucide-react'; // Icon für das Datum
import { ProjectItem } from './ProjectItem';
import { Project } from '@/app/hundert/page';

interface ProjectGridProps {
  projects: Project[];
  lastUpdated?: string; // Neu: Datum der letzten Aktualisierung als optionaler Parameter
}

export function ProjectGrid({ projects, lastUpdated = "2025-03-06" }: ProjectGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.2 });
  
  // Formatierung des Datums für deutsche Anzeige
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('de-DE', options);
  };
  
  return (
    <section className="mb-20">      
      <div 
        ref={gridRef}
        className="mx-auto grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-1.5 max-w-[200px] xs:max-w-[280px] sm:max-w-xs"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.01,
              ease: "easeOut"
            }}
          >
            <ProjectItem project={project} index={index + 1} />
          </motion.div>
        ))}
      </div>
      
      {/* Letztes Update Information */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-center text-sm text-gray-400 mt-4 flex items-center justify-center"
      >
        <Clock className="w-3 h-3 mr-1.5" />
        <span>Stand: {formatDate(lastUpdated)}</span>
      </motion.div>
    </section>
  );
}