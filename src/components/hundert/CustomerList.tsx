'use client';

import { motion } from 'framer-motion';
import { Customer } from '@/app/hundert/page';

interface CustomerListProps {
  customers: Customer[];
}

export function CustomerList({ customers }: CustomerListProps) {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-white">Kunden</h2>
        <p className="text-lg text-gray-300 mt-2">
          Unternehmen, mit denen ich zusammenarbeiten durfte
        </p>
      </motion.div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {customers.map((customer, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-4 p-4">
              {customer.logo ? (
                <img 
                  src={customer.logo} 
                  alt={`${customer.name} Logo`} 
                  className="max-w-full max-h-full object-contain" 
                />
              ) : (
                <span className="text-xl font-bold text-gray-300">
                  {customer.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-white">{customer.name}</h3>
              {customer.industry && (
                <p className="text-sm text-gray-400">{customer.industry}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}