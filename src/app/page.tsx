import { Header } from '@/components/Header';
import { Hero } from '@/components/home/Hero'; // Pfad angepasst
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { FAQ } from '@/components/FAQ';
import { ContactForm } from '@/components/ContactForm';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { Features } from '@/components/Features';
import { WebsiteAnalysis } from '@/components/WebsiteAnalysis';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
       <Hero /> 
      </main>
     
    </div>
  );
}