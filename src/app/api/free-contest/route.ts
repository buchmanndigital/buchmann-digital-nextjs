import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

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
    const data = await request.json();
    const { name, email, company, website, phone, message } = data;

    // E-Mail an den Administrator senden
    await transporter.sendMail({
      from: process.env.STRATO_EMAIL_USER,
      to: process.env.STRATO_EMAIL_USER,
      subject: 'Neue Contest-Teilnahme',
      html: `
        <h2>Neue Contest-Teilnahme</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Unternehmen:</strong> ${company}</p>
        <p><strong>Website:</strong> ${website || 'Keine Website angegeben'}</p>
        <p><strong>Telefon:</strong> ${phone || 'Keine Telefonnummer angegeben'}</p>
        <p><strong>Nachricht:</strong> ${message}</p>
      `,
    });

    // Bestätigungs-E-Mail an den Bewerber senden
    await transporter.sendMail({
      from: process.env.STRATO_EMAIL_USER,
      to: email,
      subject: 'Bestätigung deiner Bewerbung',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4A90E2;">Vielen Dank für deine Bewerbung!</h2>
          <p>Hallo ${name},</p>
          <p>vielen Dank für deine Teilnahme an dem Website-Gewinnspiel. Ich habe deine Bewerbung erhalten und werde sie so schnell wie möglich prüfen.</p>
          <p>Ich werde mich innerhalb von 48 Stunden bei dir melden.</p>
          <p>Mit freundlichen Grüßen,</p>
          <p>Florian Buchmann</p>
          <div style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd;">
            <p style="font-size: 0.9em; color: #999;">Buchmann Digital</p>
            <p style="font-size: 0.9em; color: #999;">Adresse: Markstraße 1, 87541 Bad Hindelang</p>
            <p style="font-size: 0.9em; color: #999;">Telefon: +49 174 9165008</p>
            <p style="font-size: 0.9em; color: #999;">E-Mail: info@buchmann-digital.de</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'E-Mail wurde erfolgreich versendet' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Versenden der E-Mail' },
      { status: 500 }
    );
  }
}