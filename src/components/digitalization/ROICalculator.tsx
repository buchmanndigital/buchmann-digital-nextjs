'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Calculator, TrendingUp, Clock, PiggyBank, ArrowRight, Users, Timer, EuroIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useRouter } from 'next/navigation';

export function ROICalculator() {
  const [employeeCount, setEmployeeCount] = useState(10);
  const [hoursPerWeek, setHoursPerWeek] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(50);
  const router = useRouter();

  const calculateSavings = () => {
    const weeklyHours = employeeCount * hoursPerWeek;
    const weeklySavings = weeklyHours * hourlyRate;
    const monthlySavings = weeklySavings * 4;
    const yearlySavings = monthlySavings * 12;
    return {
      weekly: weeklySavings,
      monthly: monthlySavings,
      yearly: yearlySavings
    };
  };

  const savings = calculateSavings();

  return (
    <section className="py-20 bg-gray-900" id="calculator">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-900/50 rounded-full px-4 py-2 mb-6">
            <Calculator className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-medium">Einsparpotenzial berechnen</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            ROI-Rechner
          </h2>
          <p className="text-xl text-gray-300">
            Berechnen Sie Ihr individuelles Einsparpotenzial durch Prozessautomatisierung
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-800 border-gray-700 p-8">
            <div className="grid grid-cols-1 gap-12 mb-12">
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-900/50 flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300">
                          Anzahl Mitarbeiter
                        </label>
                        <span className="text-2xl font-bold text-blue-400">
                          {employeeCount}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Slider
                    value={[employeeCount]}
                    onValueChange={(value) => setEmployeeCount(value[0])}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-400">
                    <span>1</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-900/50 flex items-center justify-center">
                        <Timer className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300">
                          Stunden pro Woche für manuelle Aufgaben
                        </label>
                        <span className="text-2xl font-bold text-blue-400">
                          {hoursPerWeek}h
                        </span>
                      </div>
                    </div>
                  </div>
                  <Slider
                    value={[hoursPerWeek]}
                    onValueChange={(value) => setHoursPerWeek(value[0])}
                    max={40}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-400">
                    <span>1h</span>
                    <span>20h</span>
                    <span>40h</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-900/50 flex items-center justify-center">
                        <EuroIcon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300">
                          Stundensatz
                        </label>
                        <span className="text-2xl font-bold text-blue-400">
                          {hourlyRate}€
                        </span>
                      </div>
                    </div>
                  </div>
                  <Slider
                    value={[hourlyRate]}
                    onValueChange={(value) => setHourlyRate(value[0])}
                    max={200}
                    min={20}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-400">
                    <span>20€</span>
                    <span>100€</span>
                    <span>200€</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-blue-400" />
                  <h3 className="font-bold text-gray-200">Wöchentliche Ersparnis</h3>
                </div>
                <div className="text-2xl font-bold text-blue-400">
                  {savings.weekly.toLocaleString('de-DE')} €
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                  <h3 className="font-bold text-gray-200">Monatliche Ersparnis</h3>
                </div>
                <div className="text-2xl font-bold text-blue-400">
                  {savings.monthly.toLocaleString('de-DE')} €
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
                <div className="flex items-center gap-3 mb-4">
                  <PiggyBank className="w-6 h-6 text-blue-400" />
                  <h3 className="font-bold text-gray-200">Jährliche Ersparnis</h3>
                </div>
                <div className="text-2xl font-bold text-blue-400">
                  {savings.yearly.toLocaleString('de-DE')} €
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={() => router.push('/digitalisierung/buchen')}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg group"
              >
                <span className="hidden md:inline">Jetzt Einsparpotenzial besprechen</span>
                <span className="md:hidden">Potenzial besprechen</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}