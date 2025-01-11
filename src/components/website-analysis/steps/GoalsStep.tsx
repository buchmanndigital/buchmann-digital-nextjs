import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { goals, slideVariants } from '../constants';
import { FormData } from '../types';

interface GoalsStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  customGoal: string;
  setCustomGoal: (goal: string) => void;
}

export function GoalsStep({ formData, setFormData }: GoalsStepProps) {
  return (
    <motion.div
      key="step1"
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => {
              const goals = formData.mainGoals.includes(goal.id)
                ? formData.mainGoals.filter(g => g !== goal.id)
                : [...formData.mainGoals, goal.id];
              setFormData({ ...formData, mainGoals: goals });
            }}
            className={`p-4 rounded-lg border-2 transition-all ${
              formData.mainGoals.includes(goal.id)
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <goal.icon className={`w-6 h-6 ${
                formData.mainGoals.includes(goal.id) ? 'text-indigo-600' : 'text-gray-400'
              }`} />
              <span className={`font-medium ${
                formData.mainGoals.includes(goal.id) ? 'text-indigo-600' : 'text-gray-700'
              }`}>
                {goal.label}
              </span>
              {formData.mainGoals.includes(goal.id) && (
                <Check className="w-5 h-5 text-indigo-600 ml-auto" />
              )}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}