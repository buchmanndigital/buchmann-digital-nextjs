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
    const { name, email, company, projectTitle, projectDescription } = data;

    // E-Mail-Inhalt
    const htmlContent = `
      <h2>Neue Projekteinreichung für die 100 Projekte</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>E-Mail:</strong> ${email}</p>
      ${company ? `<p><strong>Unternehmen:</strong> ${company}</p>` : ''}
      <p><strong>Projekttitel:</strong> ${projectTitle}</p>
      <p><strong>Projektbeschreibung:</strong></p>
      <p>${projectDescription.replace(/\n/g, '<br>')}</p>
    `;

    await transporter.sendMail({
      from: process.env.STRATO_EMAIL_USER,
      to: process.env.STRATO_EMAIL_USER,
      subject: `Neue Projekteinreichung: ${projectTitle}`,
      html: htmlContent,
    });

    return NextResponse.json(
      { message: 'Projekteinreichung wurde erfolgreich versendet' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Versenden der Projekteinreichung' },
      { status: 500 }
    );
  }
}