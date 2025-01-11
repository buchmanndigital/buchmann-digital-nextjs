'use client';
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';

export function CTA() {
  const router = useRouter();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-indigo-600 flex flex-col items-center justify-center rounded-lg mt-20 p-8 md:p-12 text-center text-white cursor-pointer"
      onClick={scrollToContact}
    >
      <div className="absolute inset-0 w-full h-full bg-indigo-600 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      
      <div className="absolute inset-0 w-full h-full">
        <Boxes />
      </div>
      
      <h2 className={cn("text-2xl md:text-3xl lg:text-4xl font-bold max-w-2xl mx-auto relative z-20")}>
        Lassen Sie uns gemeinsam Ihr Unternehmen digital transformieren
      </h2>
    </div>
  );
}