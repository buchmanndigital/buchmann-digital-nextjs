import { Check } from 'lucide-react';
import { steps } from '../constants';

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {steps.map(({ number, icon: Icon, title }) => (
          <div key={number} className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                currentStep === number
                  ? 'bg-indigo-600 text-white'
                  : currentStep > number
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {currentStep > number ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
            </div>
            <span className={`text-xs text-center ${
              currentStep === number ? 'text-indigo-600 font-medium' : 'text-gray-500'
            }`}>
              {title}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-4 mb-8">
        <div className="absolute w-full h-1 bg-gray-200 rounded">
          <div
            className="absolute h-full bg-indigo-600 rounded transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}