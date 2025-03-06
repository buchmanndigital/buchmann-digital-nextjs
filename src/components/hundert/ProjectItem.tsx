import { motion } from 'framer-motion';
import Link from 'next/link';
import { Project } from '@/app/hundert/page';

interface ProjectItemProps {
  project: Project;
  index: number;
}

export function ProjectItem({ project, index }: ProjectItemProps) {
  // Farbpalette definieren
  const colors = [
    'bg-blue-400',
    'bg-pink-400',
    'bg-green-400',
    'bg-yellow-400',
    'bg-indigo-400',
    'bg-purple-400',
    'bg-cyan-400',
    'bg-red-400',
    'bg-orange-400',
  ];
  
  // Farbe basierend auf der Projekt-ID auswählen (stabil, ändert sich nicht bei Neuladen)
  const colorIndex = (project.id - 1) % colors.length;
  
  // Wenn das Projekt nicht gefüllt ist, grau verwenden, ansonsten die ausgewählte Farbe
  const bgColor = !project.filled ? 'bg-gray-500' : colors[colorIndex];

  // Funktion zum Scrollen zum Kontaktformular bleibt unverändert
  const scrollToContactForm = () => {
    const contactForm = document.getElementById('project-contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative flex items-center justify-center group">
      <div className="flex items-center justify-center">
        {project.filled ? (
          // Gefüllte Projekte sind zu ihrem normalen Ziel verlinkt und öffnen in neuem Tab
          <Link href={project.url || '#'} target="_blank" rel="noopener noreferrer">
            <motion.div
              className={`w-5 h-5 sm:w-6 sm:h-6 ${bgColor} rounded-sm hover:z-10`}
              whileHover={{ scale: 1.3 }}
              transition={{ duration: 0.2 }}
            />
          </Link>
        ) : (
          // Nicht gefüllte Projekte scrollen zum Kontaktformular
          <motion.div
            onClick={scrollToContactForm}
            className={`w-5 h-5 sm:w-6 sm:h-6 ${bgColor} rounded-sm hover:z-10 cursor-pointer`}
            whileHover={{ scale: 1.3 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>
      
      {/* Info-Fenster beim Hovern */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-[200px] bg-gray-800 text-white rounded-md p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
        <div className="text-center">
          {project.filled ? (
            <>
              <h3 className="font-medium text-sm">{project.title}</h3>
              {project.subtitle && (
                <p className="text-xs text-gray-300 mt-1">{project.subtitle}</p>
              )}
            </>
          ) : (
            <h3 className="font-medium text-sm">Jetzt dein Projekt einreichen</h3>
          )}
        </div>
        
        {/* Kleiner Pfeil nach unten */}
        <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 left-1/2 -translate-x-1/2 bottom-[-4px]"></div>
      </div>
    </div>
  );
}