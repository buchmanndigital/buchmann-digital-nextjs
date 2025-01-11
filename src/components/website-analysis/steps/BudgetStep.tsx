import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { slideVariants } from '../constants';
import { FormData } from '../types';

interface BudgetStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export function BudgetStep({ formData, setFormData }: BudgetStepProps) {
  return (
    <motion.div
      key="step2"
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-8"
    >
      <div className="flex items-center space-x-4">
        <Wallet className="w-8 h-8 text-indigo-600" />
        <div>
          <h3 className="text-xl font-semibold">Budget</h3>
          <p className="text-gray-600">Wählen Sie Ihr Budget</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <Slider
          value={[formData.budget]}
          onValueChange={(value) => setFormData({ ...formData, budget: value[0] })}
          max={20000}
          min={500}
          step={100}
          className="w-full"
        />
        <div className="text-center text-2xl font-bold text-indigo-600">
          {formData.budget.toLocaleString('de-DE')} €
        </div>
      </div>
    </motion.div>
  );
}