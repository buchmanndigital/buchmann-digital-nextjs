'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';

export default function ThankYouPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [formattedTime, setFormattedTime] = useState<string>('');

  useEffect(() => {
    const startTime = searchParams.get('event_start_time');
    if (startTime) {
      const date = new Date(startTime);
      
      // Format date in German style
      setFormattedDate(new Intl.DateTimeFormat('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date));

      // Format time
      setFormattedTime(new Intl.DateTimeFormat('de-DE', {
        hour: '2-digit',
        minute: '2-digit'
      }).format(date));
    }
  }, [searchParams]);

  const inviteeName = searchParams.get('invitee_full_name') || 'Geschätzter Interessent';
  const companyName = searchParams.get('answer_1') || 'Ihr Unternehmen';

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-8" />
          
          <h1 className="text-4xl font-bold mb-6">
            Termin erfolgreich gebucht!
          </h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <p className="text-xl mb-6">
              Hallo {inviteeName},<br />
              vielen Dank für Ihre Terminbuchung für {companyName}.
            </p>

            <div className="flex items-center justify-center gap-3 text-blue-600 mb-6">
              <Calendar className="w-6 h-6" />
              <span className="text-lg font-medium">
                {formattedDate} um {formattedTime} Uhr
              </span>
            </div>

            <div className="text-left space-y-4 mb-8">
              <h2 className="text-xl font-bold">Nächste Schritte:</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Sie erhalten in Kürze eine Kalendereinladung per E-Mail</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Bereiten Sie gerne Ihre Fragen zur Digitalisierung vor</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Das Gespräch findet online via Google Meet statt</span>
                </li>
              </ul>
            </div>

            <Button
              onClick={() => router.push('/digitalisierung')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Zurück zur Übersicht
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}