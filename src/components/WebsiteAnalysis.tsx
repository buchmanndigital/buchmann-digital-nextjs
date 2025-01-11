"use client"

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StepIndicator } from './website-analysis/components/StepIndicator';
import { GoalsStep } from './website-analysis/steps/GoalsStep';
import { BudgetStep } from './website-analysis/steps/BudgetStep';
import { TimelineStep } from './website-analysis/steps/TimelineStep';
import { CompanyStep } from './website-analysis/steps/CompanyStep';
import { ContactStep } from './website-analysis/steps/ContactStep';
import { FormData } from './website-analysis/types';

export function WebsiteAnalysis() {
  const [step, setStep] = useState(1);
  const [customGoal, setCustomGoal] = useState('');
  const [formData, setFormData] = useState<FormData>({
    websiteUrl: '',
    companyName: '',
    industry: '',
    mainGoals: [],
    customGoals: [],
    budget: 500,
    timeline: '',
    name: '',
    email: '',
    phone: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.mainGoals.length > 0 || formData.customGoals.length > 0;
      case 2:
        return formData.budget >= 500;
      case 3:
        return formData.timeline !== '';
      case 4:
        return formData.websiteUrl !== '' && formData.companyName !== '' && formData.industry !== '';
      case 5:
        return formData.name !== '' && formData.email !== '';
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;

    if (step < 5) {
      setStep(step + 1);
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('/api/website-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleReset = () => {
    setFormData({
      websiteUrl: '',
      companyName: '',
      industry: '',
      mainGoals: [],
      customGoals: [],
      budget: 500,
      timeline: '',
      name: '',
      email: '',
      phone: ''
    });
    setStep(1);
    setStatus('idle');
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return 'Was sind Ihre Ziele?';
      case 2:
        return 'Welches Budget haben Sie?';
      case 3:
        return 'Wann möchten Sie starten?';
      case 4:
        return 'Erzählen Sie uns von Ihrem Unternehmen';
      case 5:
        return 'Wie können wir Sie erreichen?';
      default:
        return '';
    }
  };

  const renderStep = () => {
    if (status === 'success') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Vielen Dank für Ihre Anfrage!
          </h3>
          <p className="text-gray-600 mb-6">
            Wir haben Ihre Informationen erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.
          </p>
          <Button
            onClick={handleReset}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Neue Analyse starten
          </Button>
        </motion.div>
      );
    }

    switch (step) {
      case 1:
        return (
          <GoalsStep
            formData={formData}
            setFormData={setFormData}
            customGoal={customGoal}
            setCustomGoal={setCustomGoal}
          />
        );
      case 2:
        return <BudgetStep formData={formData} setFormData={setFormData} />;
      case 3:
        return <TimelineStep formData={formData} setFormData={setFormData} />;
      case 4:
        return <CompanyStep formData={formData} setFormData={setFormData} />;
      case 5:
        return <ContactStep formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-gray-50" id="analysis">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Kostenlose Website-Analyse
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {status !== 'success' && <StepIndicator currentStep={step} />}
            {status !== 'success' && <h3 className="text-2xl font-bold mb-6">{getStepTitle()}</h3>}

            <div className="h-auto">
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>
            </div>

            {status !== 'success' && (
              <div className="mt-8 flex justify-between items-center">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                  >
                    Zurück
                  </Button>
                )}
                <Button
                  className={`ml-auto bg-indigo-600 text-white ${
                    !canProceed() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
                  }`}
                  onClick={handleSubmit}
                  disabled={!canProceed() || status === 'sending'}
                >
                  {status === 'sending' ? (
                    'Wird gesendet...'
                  ) : (
                    <>
                      {step === 5 ? 'Absenden' : 'Weiter'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {status === 'error' && (
              <p className="mt-4 text-center text-sm text-red-600">
                Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}