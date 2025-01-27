'use client';

import { Users, Bot, TrendingUp, Brain, ArrowRight } from 'lucide-react';

export function WorkforceSection() {
  return (
    <section className="py-20 bg-white" id="fachkraeftemangel">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-medium">Fachkräftemangel</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Digitalisierung als Lösung für den Fachkräftemangel
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Problem Statement */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Die Herausforderung</h3>
                <p className="text-gray-600">Fachkräftemangel in Deutschland</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-600">Fehlendes qualifiziertes Personal</p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-600">Abhängigkeit von einzelnen Mitarbeitern</p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-600">Steigende Personalkosten</p>
              </div>
            </div>
          </div>

          {/* Right side - Solution */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Automatisierung</h3>
                  <p className="text-gray-600">Digitale Prozesse statt manueller Arbeit</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">KI-Integration</h3>
                  <p className="text-gray-600">Intelligente Unterstützung durch KI</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Effizienzsteigerung</h3>
                  <p className="text-gray-600">Mehr Leistung mit weniger Ressourcen</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto text-center">
          <p className="text-xl text-blue-700 font-medium">
            Die Digitalisierung von Prozessen ist oftmals einfacher und kostengünstiger als die 
            langwierige Suche nach qualifizierten Mitarbeitern!
          </p>
        </div>
      </div>
    </section>
  );
}