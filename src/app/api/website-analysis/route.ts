import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { goals } from '@/components/website-analysis/constants';

const transporter = nodemailer.createTransport({
  host: process.env.STRATO_EMAIL_HOST,
  port: parseInt(process.env.STRATO_EMAIL_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.STRATO_EMAIL_USER,
    pass: process.env.STRATO_EMAIL_PASS,
  },
});

const getGoalLabel = (goalId: string): string => {
  const goal = goals.find(g => g.id === goalId);
  return goal ? goal.label : goalId;
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      websiteUrl,
      companyName,
      industry,
      mainGoals,
      customGoals,
      budget,
      timeline,
      name,
      email,
      phone,
    } = data;

    // Übersetze die Timeline-ID in einen lesbaren Text
    const timelineText = {
      'asap': 'So schnell wie möglich',
      '1-month': 'Innerhalb eines Monats',
      '3-months': 'In den nächsten 3 Monaten',
      'planning': 'Noch in der Planungsphase'
    }[timeline as keyof typeof timelineText] || timeline;

    // Konvertiere die Goal-IDs in lesbare Labels und füge die benutzerdefinierten Ziele hinzu
    const mainGoalLabels = mainGoals.map(getGoalLabel);
    const allGoals = [...mainGoalLabels];

    // Füge benutzerdefinierte Ziele hinzu, wenn vorhanden
    if (customGoals && customGoals.length > 0) {
      allGoals.push(...customGoals);
    }

    await transporter.sendMail({
      from: process.env.STRATO_EMAIL_USER,
      to: process.env.STRATO_EMAIL_USER,
      subject: 'Neue Website-Analyse Anfrage',
      html: `
        <h2>Neue Website-Analyse Anfrage</h2>
        
        <h3>Unternehmensinformationen</h3>
        <p><strong>Website:</strong> ${websiteUrl}</p>
        <p><strong>Unternehmen:</strong> ${companyName}</p>
        <p><strong>Branche:</strong> ${industry}</p>
        
        <h3>Ziele</h3>
        <ul>
          ${allGoals.map(goal => `<li>${goal}</li>`).join('')}
        </ul>
        
        <h3>Budget & Zeitplan</h3>
        <p><strong>Budget:</strong> ${budget.toLocaleString('de-DE')} €</p>
        <p><strong>Zeitplan:</strong> ${timelineText}</p>
        
        <h3>Kontaktdaten</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
      `,
    });

    return NextResponse.json(
      { message: 'Analyse wurde erfolgreich versendet' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Versenden der Analyse' },
      { status: 500 }
    );
  }
}