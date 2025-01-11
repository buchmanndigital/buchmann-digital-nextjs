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
              <h2 className="text-xl font-semibold mb-3">3. Datenerfassung auf dieser Website</h2>
              <h3 className="text-lg font-semibold mt-4">3.1 Server-Log-Dateien</h3>
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
              <p className="mt-2">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Grundlage
                der Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO, der die Verarbeitung von Daten zur
                Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">4. Cookies</h2>
              <p>
                Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät
                gespeichert werden und die Ihr Browser speichert. Sie richten keinen Schaden an.
              </p>
              <p className="mt-2">
                Die meisten der von uns verwendeten Cookies sind sogenannte „Session-Cookies“. Sie werden nach
                Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert,
                bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch
                wiederzuerkennen.
              </p>
              <p className="mt-2">
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden
                und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell
                ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren.
                Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">5. Ihre Rechte</h2>
              <h3 className="text-lg font-semibold mt-4">5.1 Recht auf Auskunft</h3>
              <p>
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
                Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den
                Zweck der Datenverarbeitung.
              </p>

              <h3 className="text-lg font-semibold mt-4">5.2 Recht auf Berichtigung, Sperrung und Löschung</h3>
              <p>
                Sie haben außerdem das Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen.
                Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im
                Impressum angegebenen Adresse an uns wenden.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">6. Drittanbieter-Dienste</h2>
              <p>
                Diese Website wird auf Vercel gehostet. Vercel ist ein US-amerikanischer Hosting-Anbieter. Es
                besteht die Möglichkeit, dass personenbezogene Daten auf Servern in den USA verarbeitet werden.
                Die Verarbeitung basiert auf den Standardvertragsklauseln der Europäischen Kommission gemäß Art.
                46 DSGVO.
              </p>
              <p className="mt-2">
                Mehr Informationen finden Sie in der Datenschutzerklärung von Vercel: <a
                  href="https://vercel.com/legal/privacy-policy"
                  className="text-indigo-600 hover:text-indigo-800">https://vercel.com/legal/privacy-policy</a>
              </p>
              <h2 className="text-xl font-semibold mb-3 mt-4">7. E-Mail Formulare</h2>
              <p>
                Unsere E-Mail Formulare werden über Strato abgewickelt. Strato ist ein deutscher Hosting-Anbieter.
                Es besteht die Möglichkeit, dass personenbezogene Daten auf Servern in Deutschland verarbeitet werden.
                Die Verarbeitung basiert auf den Standardvertragsklauseln der Europäischen Kommission gemäß Art.
                46 DSGVO.
              </p>
              <p className="mt-2">
                Mehr Informationen finden Sie in der Datenschutzerklärung von Strato: <a
                  href="https://www.strato.de/datenschutz/"
                  className="text-indigo-600 hover:text-indigo-800">https://www.strato.de/datenschutz/</a>
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}