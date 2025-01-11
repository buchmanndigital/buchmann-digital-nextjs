import { Footer } from '@/components/Footer';
import { WebsiteAnalysis } from '@/components/WebsiteAnalysis';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 text-center">
          <Link href="/">
            <span className="text-indigo-600 hover:text-indigo-800">Zur Startseite</span>
          </Link>
        </div>
        <WebsiteAnalysis />
      </main>
      <Footer />
    </div>
  );
}