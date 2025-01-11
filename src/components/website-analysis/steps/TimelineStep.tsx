import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { slideVariants, timeOptions } from '../constants';
import { FormData } from '../types';

interface TimelineStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export function TimelineStep({ formData, setFormData }: TimelineStepProps) {
  return (
    <motion.div
      key="step3"
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {timeOptions.map((timeOption) => (
          <button
            key={timeOption.id}
            onClick={() => setFormData({ ...formData, timeline: timeOption.id })}
            className={`p-4 rounded-lg border-2 transition-all ${
              formData.timeline === timeOption.id
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <span className={`font-medium ${
              formData.timeline === timeOption.id ? 'text-indigo-600' : 'text-gray-700'
            }`}>
              {timeOption.label}
            </span>
            {formData.timeline === timeOption.id && (
              <Check className="w-5 h-5 text-indigo-600 ml-auto inline-block" />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}