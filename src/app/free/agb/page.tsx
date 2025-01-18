'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AGBPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Button
          className="flex items-center gap-2"
          onClick={() => router.push('/free')}
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück
        </Button>
        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-6">Allgemeine Geschäftsbedingungen</h1>
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">1. Teilnahmebedingungen</h2>
              <p>Die Teilnahme am Gewinnspiel ist kostenlos und richtet sich ausschließlich nach diesen Teilnahmebedingungen.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">2. Teilnahme</h2>
              <p>Um am Gewinnspiel teilzunehmen, ist das Ausfüllen und Absenden des bereitgestellten Teilnahmeformulars erforderlich.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">3. Teilnahmeberechtigte</h2>
              <p>Teilnahmeberechtigt sind natürliche Personen, die ihren Wohnsitz in Deutschland haben und das 18. Lebensjahr vollendet haben.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">4. Gewinn</h2>
              <p>Der Gewinner erhält ein komplettes Website-Redesign im Wert von 5.000 €.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">5. Gewinnbenachrichtigung</h2>
              <p>Der Gewinner wird per E-Mail benachrichtigt und muss sich innerhalb von 7 Tagen zurückmelden, um den Gewinn anzunehmen.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">6. Ausschluss vom Gewinnspiel</h2>
              <p>Der Veranstalter behält sich das Recht vor, Teilnehmer, die gegen die Teilnahmebedingungen verstoßen, vom Gewinnspiel auszuschließen.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">7. Vorzeitige Beendigung des Gewinnspiels</h2>
              <p>Der Veranstalter behält sich das Recht vor, das Gewinnspiel jederzeit ohne Vorankündigung und ohne Angabe von Gründen abzubrechen oder zu beenden.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">8. Verpflichtungen des Gewinners</h2>
              <ul className="list-disc list-inside">
                <li>Einhaltung vereinbarter Termine und Fristen</li>
                <li>Nennung von Buchmann Digital als Umsetzungspartner auf der Website</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">9. Datenschutz</h2>
              <p>Die erhobenen Daten werden ausschließlich für die Durchführung des Gewinnspiels verwendet und nach Abschluss gelöscht. Es gelten die Datenschutzbestimmungen des Veranstalters.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">10. Abbruch/Änderungen</h2>
              <p>Der Veranstalter behält sich das Recht vor, das Gewinnspiel bei Vorliegen wichtiger Gründe zu ändern, abzubrechen oder zu beenden. Den Teilnehmern stehen in diesem Fall keine Ansprüche gegen den Veranstalter zu.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">11. Haftung</h2>
              <p>Die Haftung des Veranstalters ist auf Vorsatz und grobe Fahrlässigkeit beschränkt. Dies gilt nicht für die Verletzung von Leben, Körper und Gesundheit.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">12. Rechtsweg</h2>
              <p>Der Rechtsweg ist ausgeschlossen. Es gilt deutsches Recht.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">13. Salvatorische Klausel</h2>
              <p>Sollten einzelne Bestimmungen dieser Teilnahmebedingungen unwirksam sein oder werden, bleibt die Gültigkeit der übrigen Bedingungen hiervon unberührt.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}