'use client';

import { motion, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

const stats = [
  {
    value: 10,
    suffix: '+',
    label: 'Jahre Erfahrung'
  },
  {
    value: 100,
    prefix: 'Über',
    suffix: '+',
    label: 'Kundenprojekte umgesetzt'
  },
  {
    value: 98,
    suffix: '%',
    label: 'zufriedene Kunden'
  }
];

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const spring = useSpring(count, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, spring, value]);

  return (
    <motion.span ref={ref} className="inline-block">
      {useTransform(spring, (latest) => Math.round(latest))}
    </motion.span>
  );
}

export function Stats() {
  return (
    <section className="mt-24 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center"
            >
              <h3 className="text-4xl font-bold mb-2">
                {stat.prefix && <span>{stat.prefix} </span>}
                <AnimatedCounter value={stat.value} duration={2} />
                {stat.suffix}
              </h3>
              <p className="text-slate-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}