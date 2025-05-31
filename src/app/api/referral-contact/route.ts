import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { collection, addDoc, Timestamp, query, where, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const transporter = nodemailer.createTransport({
  host: process.env.STRATO_EMAIL_HOST,
  port: parseInt(process.env.STRATO_EMAIL_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.STRATO_EMAIL_USER,
    pass: process.env.STRATO_EMAIL_PASS,
  },
});

const serviceNames: Record<string, string> = {
  'website': 'Professionelle Website',
  'webshop': 'Online-Shop',
  'webapp': 'Web-Anwendung',
  'seo': 'Suchmaschinenoptimierung (SEO)',
  'ads': 'Google Ads / Online-Werbung',
  'social_media': 'Social Media Marketing',
  'automation': 'Prozessautomatisierung',
  'digitalization': 'Digitalisierung',
  'consulting': 'IT-Beratung',
  'maintenance': 'Website-Wartung',
  'hosting': 'Hosting & Domains',
  'other': 'Sonstiges'
};

const budgetLabels: Record<string, string> = {
  'under-1000': 'Unter 1.000 €',
  '1000-5000': '1.000 - 5.000 €',
  '5000-10000': '5.000 - 10.000 €',
  '10000-25000': '10.000 - 25.000 €',
  'over-25000': 'Über 25.000 €',
  'discuss': 'Möchte ich besprechen'
};

export async function POST(request: Request) {
  try {
    const { 
      name, 
      email, 
      company, 
      phone, 
      services, 
      message, 
      budget,
      referralCode,
      referrerName 
    } = await request.json();

    // Validierung
    if (!name || !email || !company || !services || services.length === 0 || !message) {
      return NextResponse.json(
        { error: 'Pflichtfelder fehlen' },
        { status: 400 }
      );
    }

    // E-Mail-Format validieren
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ungültiges E-Mail-Format' },
        { status: 400 }
      );
    }

    // Kontaktdaten für Speicherung
    const contactData = {
      name,
      email,
      company,
      phone: phone || '',
      services,
      message,
      budget: budget || '',
      createdAt: Timestamp.now(),
      status: 'new'
    };

    // Kontakt in separater Collection speichern
    await addDoc(collection(db, 'referral_contacts'), {
      ...contactData,
      referralCode,
      referrerName
    });

    // Kontakt auch im referrers Dokument speichern
    const q = query(
      collection(db, 'referrers'), 
      where('referralCode', '==', referralCode),
      where('isActive', '==', true)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const referrerDoc = querySnapshot.docs[0];
      
      // Füge Kontakt zum referrers Dokument hinzu
      await updateDoc(doc(db, 'referrers', referrerDoc.id), {
        contacts: arrayUnion(contactData),
        contactCount: (referrerDoc.data().contactCount || 0) + 1,
        lastContact: new Date()
      });
    }

    // Service-Namen für E-Mail formatieren
    const selectedServices = services.map((id: string) => serviceNames[id] || id).join(', ');
    const budgetText = budget ? budgetLabels[budget] || budget : 'Nicht angegeben';

    // E-Mail an info@buchmann.digital senden
    await transporter.sendMail({
      from: process.env.STRATO_EMAIL_USER,
      to: process.env.STRATO_EMAIL_USER,
      subject: `Neue Referral-Anfrage von ${name} (via ${referrerName})`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4F46E5;">Neue Referral-Anfrage</h2>
          
          <div style="background-color: #F3F4F6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #059669; margin-top: 0;">📋 Empfehlung von: ${referrerName}</h3>
            <p><strong>Referral Code:</strong> ${referralCode}</p>
          </div>
          
          <h3 style="color: #374151;">Kontaktdaten</h3>
          <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px;">Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">E-Mail:</td>
              <td style="padding: 8px 0;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Unternehmen:</td>
              <td style="padding: 8px 0;">${company}</td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Telefon:</td>
              <td style="padding: 8px 0;">${phone}</td>
            </tr>
            ` : ''}
          </table>

          <h3 style="color: #374151;">Projektdetails</h3>
          <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px;">Dienstleistungen:</td>
              <td style="padding: 8px 0;">${selectedServices}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Budget:</td>
              <td style="padding: 8px 0;">${budgetText}</td>
            </tr>
          </table>
          
          <h3 style="color: #374151;">Nachricht</h3>
          <div style="background-color: #F9FAFB; padding: 15px; border-radius: 8px; border-left: 4px solid #4F46E5;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #FEF3C7; border-radius: 8px;">
            <p style="margin: 0; color: #92400E;">
              <strong>💡 Referral-Info:</strong> Diese Anfrage kam über den Empfehlungslink von ${referrerName}. 
              Bei erfolgreichem Projektabschluss sollte eine Provision gezahlt werden.
            </p>
          </div>
        </div>
      `,
    });

    // Bestätigungs-E-Mail an den Kunden senden
    await transporter.sendMail({
      from: process.env.STRATO_EMAIL_USER,
      to: email,
      subject: 'Vielen Dank für Ihre Anfrage - Buchmann Digital',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4F46E5;">Vielen Dank für Ihre Anfrage!</h2>
          <p>Hallo ${name},</p>
          
          <p>vielen Dank für Ihr Interesse an meinen Dienstleistungen. Ich habe Ihre Anfrage erhalten und freue mich über die Empfehlung von ${referrerName}!</p>
          
          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Ihre Anfrage im Überblick:</h3>
            <p><strong>Interessierte Dienstleistungen:</strong> ${selectedServices}</p>
            <p><strong>Unternehmen:</strong> ${company}</p>
            ${budget ? `<p><strong>Budget:</strong> ${budgetText}</p>` : ''}
          </div>
          
          <p><strong>Wie geht es weiter?</strong></p>
          <ul>
            <li>Ich melde mich innerhalb von 24 Stunden bei Ihnen</li>
            <li>Wir besprechen Ihre Anforderungen in einem kostenlosen Erstgespräch</li>
            <li>Sie erhalten ein individuelles Angebot</li>
          </ul>
          
          <p>Bei dringenden Fragen können Sie mich auch direkt erreichen:</p>
          <p>📞 <strong>+49 174 9165008</strong><br>
          ✉️ <strong>info@buchmann.digital</strong></p>
          
          <p>Mit freundlichen Grüßen,<br>Florian Buchmann</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
            <p style="font-size: 14px; color: #6B7280;">
              Buchmann Digital<br>
              Markstraße 1, 87541 Bad Hindelang<br>
              Website: www.buchmann.digital
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling referral contact:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
} 