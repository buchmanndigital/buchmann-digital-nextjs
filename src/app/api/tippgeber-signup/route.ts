import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
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

// Funktion zur Generierung eines kurzen, kryptischen Links
function generateReferralCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    // Validierung
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name und E-Mail sind erforderlich' },
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

    // Referral Code generieren
    const referralCode = generateReferralCode();
    const referralLink = `https://buchmann.digital/r/${referralCode}`;

    // Tippgeber in Firebase speichern
    await addDoc(collection(db, 'referrers'), {
      name,
      email,
      referralCode,
      createdAt: Timestamp.now(),
      isActive: true
    });

    // Bestätigungs-E-Mail an den Tippgeber senden
    await transporter.sendMail({
      from: process.env.STRATO_EMAIL_USER,
      to: email,
      subject: 'Willkommen im Tippgeber-Programm von Buchmann Digital',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4F46E5;">Willkommen im Tippgeber-Programm!</h2>
          <p>Hallo ${name},</p>
          <p>vielen Dank für deine Anmeldung zum Tippgeber-Programm von Buchmann Digital!</p>
          
          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Dein persönlicher Empfehlungslink:</h3>
            <p style="font-size: 18px; font-weight: bold; color: #4F46E5; word-break: break-all;">
              ${referralLink}
            </p>
            <p style="color: #6B7280; font-size: 14px;">
              Teile diesen Link mit Personen oder Unternehmen, die von unseren Dienstleistungen profitieren könnten.
            </p>
          </div>
          
          <p>So funktioniert es:</p>
          <ul>
            <li>Teile deinen Link mit potentiellen Kunden</li>
            <li>Wenn jemand über deinen Link Kontakt aufnimmt und darüber hinaus einen Auftrag abschließt, erhältst du eine Provision</li>
            <li>Du wirst über jeden erfolgreichen Kontakt informiert</li>
          </ul>
          
          <p>Vielen Dank für dein Vertrauen!</p>
          <p>Mit freundlichen Grüßen,<br>Florian Buchmann</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
            <p style="font-size: 14px; color: #6B7280;">
              Buchmann Digital<br>
              Markstraße 1, 87541 Bad Hindelang<br>
              Telefon: +49 174 9165008<br>
              E-Mail: info@buchmann.digital<br>
              Website: www.buchmann.digital
            </p>
          </div>
        </div>
      `,
    });

    // Info-E-Mail an info@buchmann.digital senden
    await transporter.sendMail({
      from: process.env.STRATO_EMAIL_USER,
      to: process.env.STRATO_EMAIL_USER,
      subject: 'Neuer Tippgeber registriert',
      html: `
        <h2>Neuer Tippgeber registriert</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Referral Code:</strong> ${referralCode}</p>
        <p><strong>Referral Link:</strong> ${referralLink}</p>
        <p><strong>Registriert am:</strong> ${new Date().toLocaleString('de-DE')}</p>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      referralCode,
      referralLink 
    });
  } catch (error) {
    console.error('Fehler bei der Tippgeber-Anmeldung:', error);
    return NextResponse.json(
      { error: 'Fehler bei der Anmeldung' },
      { status: 500 }
    );
  }
} 