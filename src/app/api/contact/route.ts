import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { sendLeadEvent } from '@/lib/facebook';

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
    const { firstName, lastName, email, phone, company, message } = await request.json();
    const userAgent = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || '';

    // Validierung
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Vorname, Nachname, E-Mail und Nachricht sind erforderlich' },
        { status: 400 }
      );
    }

    // Send Facebook event
    await sendLeadEvent({
      email,
      firstName,
      lastName,
      userAgent,
      sourceUrl: referer,
      isTestEvent: process.env.NODE_ENV === 'development'
    });

    // E-Mail senden
    await transporter.sendMail({
      from: process.env.STRATO_EMAIL_USER,
      to: process.env.STRATO_EMAIL_USER,
      subject: 'Neue Kontaktanfrage von der Website',
      html: `
        <h2>Neue Kontaktanfrage</h2>
        
        <h3>Kontaktdaten</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Unternehmen:</strong> ${company}</p>` : ''}
        
        <h3>Nachricht</h3>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    return NextResponse.json(
      { error: 'Fehler beim Senden der Nachricht' },
      { status: 500 }
    );
  }
}