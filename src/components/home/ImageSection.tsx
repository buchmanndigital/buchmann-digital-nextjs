'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function ImageSection() {
  return (
    <section className="relative w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="w-full relative overflow-hidden"
      >
        <div className="w-full h-auto relative">
          <Image
            src="/images/allgaeu-landscape.png"
            alt="Landschaft im Allgäu mit Bergen, Kirche und moderneren Gebäuden"
            width={1600}
            height={900}
            priority
            className="w-full h-auto object-contain"
          />
        </div>
      </motion.div>
    </section>
  );
} 