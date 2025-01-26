'use client';

import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { useEffect, useState } from "react";
import Head from "next/head";

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
        <title>Websites und Software die Unternehmen voranbringen</title>
        <meta name="description" content="Professionelle Webentwicklung und Softwarelösungen für Ihr Unternehmen" />
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