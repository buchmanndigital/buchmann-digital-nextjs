import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// E-Mail-Transporter konfigurieren
const transporter = nodemailer.createTransport({
  host: process.env.STRATO_EMAIL_HOST,
  port: parseInt(process.env.STRATO_EMAIL_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.STRATO_EMAIL_USER,
    pass: process.env.STRATO_EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, website, industry, goals, budget, message } = body;

    // Validierung der Pflichtfelder
    if (!name || !company) {
      return NextResponse.json(
        { error: 'Name und Unternehmensname sind erforderlich' },
        { status: 400 }
      );
    }

    // E-Mail oder Telefon validieren
    if (!email && !phone) {
      return NextResponse.json(
        { error: 'E-Mail oder Telefonnummer ist erforderlich' },
        { status: 400 }
      );
    }

    // E-Mail-Format validieren, wenn E-Mail vorhanden ist
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Ungültiges E-Mail-Format' },
          { status: 400 }
        );
      }
    }

    // E-Mail senden
    await transporter.sendMail({
      from: process.env.STRATO_EMAIL_USER,
      to: process.env.STRATO_EMAIL_USER,
      subject: 'Neue Anfrage: Kostenlose Unternehmensanalyse',
      html: `
        <h2>Neue Anfrage für kostenlose Unternehmensanalyse</h2>
        <p><strong>Name:</strong> ${name}</p>
        ${email ? `<p><strong>E-Mail:</strong> ${email}</p>` : ''}
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        <p><strong>Unternehmen:</strong> ${company}</p>
        ${website ? `<p><strong>Website:</strong> ${website}</p>` : ''}
        ${industry ? `<p><strong>Branche:</strong> ${industry}</p>` : ''}
        ${goals ? `<p><strong>Ziele:</strong> ${goals}</p>` : ''}
        ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
        ${message ? `<p><strong>Nachricht:</strong> ${message}</p>` : ''}
      `,
    });

    return NextResponse.json(
      { message: 'E-Mail erfolgreich gesendet' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    return NextResponse.json(
      { error: 'Interner Server-Fehler beim Senden der E-Mail' },
      { status: 500 }
    );
  }
} 