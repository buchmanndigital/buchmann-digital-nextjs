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
    const data = await request.json();
    const { name, email, phone, company, package: selectedPackage, message } = data;

    await transporter.sendMail({
      from: process.env.STRATO_EMAIL_USER,
      to: process.env.STRATO_EMAIL_USER,
      subject: 'Neue Kontaktanfrage von der Kundengewinnungs-Landingpage',
      html: `
        <h2>Neue Kontaktanfrage von der Kundengewinnungs-Landingpage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Unternehmen:</strong> ${company}</p>
        <p><strong>Paket:</strong> ${selectedPackage}</p>
        <p><strong>Nachricht:</strong> ${message}</p>
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