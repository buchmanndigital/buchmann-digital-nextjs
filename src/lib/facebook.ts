import crypto from 'crypto';

const hashData = (data: string): string => {
  return crypto
    .createHash('sha256')
    .update(data.toLowerCase().trim())
    .digest('hex');
};

interface SendLeadEventParams {
  email: string;
  firstName: string;
  lastName: string;
  userAgent: string;
  sourceUrl: string;
  isTestEvent?: boolean;
}

export async function sendLeadEvent({
  email,
  firstName,
  lastName,
  userAgent,
  sourceUrl,
  isTestEvent = false
}: SendLeadEventParams) {
  const eventData = {
    data: [{
      event_name: "Lead",
      event_time: Math.floor(Date.now() / 1000),
      action_source: "website",
      event_source_url: sourceUrl,
      user_data: {
        em: [hashData(email)],
        fn: firstName ? [hashData(firstName)] : undefined,
        ln: lastName ? [hashData(lastName)] : undefined,
        country: [hashData("de")],
        client_user_agent: userAgent
      },
      custom_data: {
        content_name: "Homepage Contact Form",
        content_category: "Lead",
        value: "0.00",
        currency: "EUR"
      }
    }]
  };

  const testParam = isTestEvent ? '&test_event_code=TEST71002' : '';
  
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}/events?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}${testParam}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    }
  );

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(`Facebook API Error: ${JSON.stringify(data)}`);
  }

  return data;
} 