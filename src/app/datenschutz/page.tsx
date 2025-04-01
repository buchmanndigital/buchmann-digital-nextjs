import { Footer } from '@/components/Footer';
import { BackButton } from '@/components/BackButton';

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <BackButton />

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">1. Allgemeine Hinweise</h2>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten
                sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">2. Verantwortlicher</h2>
              <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
              <p>Florian Buchmann</p>
              <p>Markstraße 1</p>
              <p>87541 Bad Hindelang</p>
              <p>Telefon: +49 (0) 174 9165008</p>
              <p>E-Mail: info@buchmann.digital</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">3. Meta (Facebook) Pixel</h2>
              <p className="mb-2">
                Wir setzen auf unserer Website den "Meta-Pixel" der Meta Platforms Ireland Limited (4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland) ein.
              </p>
              <p className="mb-2">
                Der Meta-Pixel ermöglicht es Meta, unsere Website-Besucher als Zielgruppe für Werbeanzeigen (sogenannte "Meta-Ads") zu bestimmen. Dementsprechend setzen wir den Meta-Pixel ein, um unsere Meta-Ads nur bei solchen Meta-Nutzern anzuzeigen, die auch ein Interesse an unserem Angebot gezeigt haben.
              </p>
              <p className="mb-2">
                Mithilfe des Meta-Pixels können wir auch die Wirksamkeit der Meta-Werbeanzeigen für statistische und Marktforschungszwecke nachvollziehen, indem wir sehen, ob Nutzer nach dem Klick auf eine Meta-Werbeanzeige auf unsere Website weitergeleitet wurden.
              </p>
              <p className="mb-2">
                Der Meta-Pixel wird beim Aufruf unserer Seiten unmittelbar durch Meta eingebunden und kann ein sogenanntes Cookie, also eine kleine Datei, auf Ihrem Gerät speichern. Wenn Sie sich anschließend bei Meta einloggen oder im eingeloggten Zustand Meta besuchen, wird der Besuch unseres Angebotes in Ihrem Profil vermerkt.
              </p>
              <p className="mb-2">
                Die über Sie erhobenen Daten sind für uns anonym, bieten uns also keine Rückschlüsse auf die Identität der Nutzer. Allerdings werden die Daten von Meta gespeichert und verarbeitet, sodass eine Verbindung zum jeweiligen Nutzerprofil möglich ist. Die Verarbeitung der Daten durch Meta erfolgt im Rahmen von Metas Datenverwendungsrichtlinie.
              </p>
              <p className="mb-2">
                Die Verwendung des Meta-Pixels erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an der Analyse, Optimierung und dem wirtschaftlichen Betrieb unseres Onlineangebotes.
              </p>
              <p className="mb-2">
                Wenn Sie der Datenerfassung durch den Meta-Pixel widersprechen möchten, können Sie dies durch Ablehnen der Cookies in unserem Cookie-Banner tun oder die Funktion deaktivieren unter: <a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">Facebook Ad Settings</a>.
              </p>
              <p className="mb-2">
                Weitere Informationen zur Erhebung und Nutzung der Daten durch Meta sowie über Ihre diesbezüglichen Rechte und Möglichkeiten zum Schutz Ihrer Privatsphäre finden Sie in den Datenschutzhinweisen von Meta unter: <a href="https://www.facebook.com/about/privacy/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">Meta Datenschutzhinweise</a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">4. Terminbuchung über Calendly</h2>
              <p className="mb-2">
                Für die Terminvereinbarung nutzen wir den Dienst Calendly. Wenn Sie einen Termin buchen,
                werden die folgenden Daten verarbeitet:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Name</li>
                <li>E-Mail-Adresse</li>
                <li>Gewählter Termin</li>
                <li>Eventuelle zusätzliche Angaben, die Sie während der Buchung machen</li>
              </ul>
              <p className="mt-4">
                Calendly verwendet Cookies und ähnliche Technologien für folgende Zwecke:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Technisch notwendige Cookies für die Funktionalität des Buchungssystems</li>
                <li>Performance-Cookies zur Verbesserung des Services</li>
                <li>Analyse-Cookies zur Optimierung des Angebots</li>
              </ul>
              <p className="mt-4">
                Die Datenverarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)
                sowie zur Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO).
              </p>
              <p className="mt-2">
                Calendly ist ein Dienst der Calendly LLC mit Sitz in den USA. Die Datenübermittlung in die
                USA erfolgt auf Basis der EU-Standardvertragsklauseln. Weitere Informationen finden Sie in der
                <a
                  href="https://calendly.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 ml-1"
                >
                  Datenschutzerklärung von Calendly
                </a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">5. Server-Log-Dateien</h2>
              <p>
                Der Provider dieser Website erhebt und speichert automatisch Informationen in sogenannten
                Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside mt-2">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">6. Google Tag (gtag.js)</h2>
              <p>
                Auf dieser Website wird das Google Tag (gtag.js) verwendet, ein Analysetool von Google. Dabei
                werden keine Cookies verwendet, und die IP-Adresse wird anonymisiert. Das Tracking erfolgt
                ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO, da ein berechtigtes Interesse an
                der Analyse des Nutzerverhaltens besteht, um unser Angebot zu optimieren. 
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">7. Ihre Rechte</h2>
              <p>
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung
                Ihrer personenbezogenen Daten. Zudem haben Sie das Recht auf Datenübertragbarkeit und können
                einer Verarbeitung aus berechtigten Interessen widersprechen.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">8. Kontakt für Datenschutzfragen</h2>
              <p>
                Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei
                Auskünften, Berichtigung, Sperrung oder Löschung von Daten wenden Sie sich bitte an:
              </p>
              <p className="mt-2">Florian Buchmann</p>
              <p>E-Mail: info@buchmann.digital</p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}