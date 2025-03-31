import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
    const { 
      name, 
      email, 
      phone, 
      company, 
      website, 
      industry, 
      goals, 
      budget,
      message 
    } = await request.json();

    // Validierung der Pflichtfelder
    if (!name || !email || !phone || !company || !website || !industry || !goals || !budget) {
      return NextResponse.json(
        { error: 'Bitte füllen Sie alle Pflichtfelder aus' },
        { status: 400 }
      );
    }

    // E-Mail senden
    await transporter.sendMail({
      from: process.env.STRATO_EMAIL_USER,
      to: process.env.STRATO_EMAIL_USER,
      subject: 'Neue kostenlose Analyse-Anfrage',
      html: `
        <h2>Neue kostenlose Analyse-Anfrage</h2>
        
        <h3>Kontaktdaten</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Unternehmen:</strong> ${company}</p>
        <p><strong>Website:</strong> ${website}</p>
        <p><strong>Branche:</strong> ${industry}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        
        <h3>Ziele</h3>
        <p>${goals}</p>
        
        ${message ? `
          <h3>Zusätzliche Nachricht</h3>
          <p>${message}</p>
        ` : ''}
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