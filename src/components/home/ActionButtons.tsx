"use client";

import Link from 'next/link';
import { ArrowRight, CalendarCheck, BookOpen, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

type ButtonStyle = 'primary' | 'secondary';

type ActionButtonProps = {
  href: string;
  label: string;
  style?: ButtonStyle;
  icon?: LucideIcon;
  showArrow?: boolean;
};

export function ActionButton({ 
  href, 
  label, 
  style = 'primary', 
  icon: Icon, 
  showArrow = false 
}: ActionButtonProps) {
  // Farbverlauf geändert von blue zu indigo (lila)
  const primaryClasses = "group flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3.5 px-7 rounded-lg text-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5";
  
  // Rahmen- und Textfarbe geändert zu indigo (lila)
  const secondaryClasses = "group flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border-2 border-indigo-600 text-indigo-600 font-medium py-3.5 px-7 rounded-lg text-center transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5";
  
  const classes = style === 'primary' ? primaryClasses : secondaryClasses;
  
  return (
    <Link href={href} className={classes}>
      {Icon && <Icon className="w-5 h-5" />}
      <span>{label}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
      )}
    </Link>
  );
}

// Eine Container-Komponente für mehrere Buttons
export function ActionButtons({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row gap-5 mb-12">
      {children}
    </div>
  );
}

// Voreingestellte Buttons für die häufigsten Anwendungsfälle
export function ContactButton({ onClick }: { onClick?: (e: React.MouseEvent) => void }) {
  return (
    <Link
      href="/kontakt"
      onClick={onClick}
      className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3.5 px-7 rounded-lg text-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
    >
      <span>Kostenlose Beratung</span>
      <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
    </Link>
  );
}

export function ServicesButton() {
  return (
    <Link
      href="#bewertungen"
      className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border-2 border-indigo-600 text-indigo-600 font-medium py-3.5 px-7 rounded-lg text-center transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById('bewertungen')?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <span>Was meine Kunden sagen</span>
      <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
    </Link>
  );
}