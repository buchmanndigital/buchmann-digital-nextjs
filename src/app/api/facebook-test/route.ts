import { NextResponse } from 'next/server';
import crypto from 'crypto';

const hashData = (data: string): string => {
  return crypto
    .createHash('sha256')
    .update(data.toLowerCase().trim())
    .digest('hex');
};

export async function GET() {
  try {
    const testEvent = {
      data: [{
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url: "https://buchmann.digital",
        user_data: {
          em: [hashData("test@example.com")],
          fn: [hashData("test")],
          ln: [hashData("test")],
          country: [hashData("de")],
          client_user_agent: "Mozilla/5.0 (Test User Agent)"
        },
        custom_data: {
          content_name: "Homepage Contact Form",
          content_category: "Lead",
          value: "0.00",
          currency: "EUR"
        }
      }]
    };

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}/events?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}&test_event_code=TEST71002`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testEvent),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Facebook API Error: ${JSON.stringify(data)}`);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending test event:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 