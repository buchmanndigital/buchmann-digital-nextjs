'use client';

import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const consentGiven = localStorage.getItem('cookiesAccepted');
    const consentDenied = localStorage.getItem('cookiesDenied');
    if (consentGiven) {
      setConsent(true);
      loadGoogleAnalytics();
    } else if (consentDenied) {
      setConsent(false);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setConsent(true);
    loadGoogleAnalytics();
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('cookiesDenied', 'true');
    setConsent(false);
  };

  const loadGoogleAnalytics = () => {
    // Google Analytics Tag
    const analyticsScript = document.createElement('script');
    analyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-QDKWGKEYQ6';
    analyticsScript.async = true;
    document.head.appendChild(analyticsScript);

    // Google Ads Tag
    const adsScript = document.createElement('script');
    adsScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-10838957917';
    adsScript.async = true;
    document.head.appendChild(adsScript);

    // Gemeinsames Setup Script
    const setupScript = document.createElement('script');
    setupScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      
      // Google Analytics Konfiguration
      gtag('config', 'G-QDKWGKEYQ6', { 'anonymize_ip': true, 'storage': 'none' });
      
      // Google Ads Konfiguration
      gtag('config', 'AW-10838957917');
    `;
    document.head.appendChild(setupScript);
  };

  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <title>Buchmann Digital | Webentwicklung für Handwerker und regionale Dienstleister</title>
        <meta name="description" content="Webseiten & SEO für Handwerker und regionale Dienstleister. Mehr Kundenanfragen durch bessere Sichtbarkeit in Ihrer Region. Jetzt unverbindlich beraten lassen!" />
        <meta name="keywords" content="Webentwicklung, Webseite für Handwerker, SEO, Digitalisierung, Kundenakquise, Kundengewinnung, regionale Sichtbarkeit" />
        <link rel="canonical" href="https://buchmann.digital" />
        <meta property="og:title" content="Buchmann Digital | Webentwicklung für Handwerker und regionale Dienstleister" />
        <meta property="og:description" content="Webseiten & SEO für Handwerker und regionale Dienstleister. Mehr Kundenanfragen durch bessere Sichtbarkeit in Ihrer Region." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://buchmann.digital" />
        <meta property="og:site_name" content="Buchmann Digital" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Buchmann Digital | Webentwicklung für Handwerker" />
        <meta name="twitter:description" content="Webseiten & SEO für Handwerker und regionale Dienstleister. Mehr Kundenanfragen durch bessere Sichtbarkeit in Ihrer Region." />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {consent && (
          <>
            <Script id="facebook-pixel">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img 
                height="1" 
                width="1" 
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}
        {typeof window !== 'undefined' && window.location.pathname === '/digitalisierung/danke' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                gtag('event', 'ads_conversion_Termin_vereinbaren_1', {});
              `
            }}
          />
        )}
      </head>
      <body>
        {children}
        <Analytics />
        {consent === null && (
          <div id="cookie-consent-banner" className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-center md:text-left">
                Wir verwenden Cookies, um unsere Website und unseren Service zu optimieren. <a href="/datenschutz" className="underline">Mehr erfahren</a>
              </p>
              <div className="flex space-x-2">
                <button onClick={handleAcceptCookies} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                  Akzeptieren
                </button>
                <button onClick={handleDeclineCookies} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                  Ablehnen
                </button>
              </div>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}