import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      projectType,
      propertyLocation,
      projectDescription,
      preferredContact,
      Timeline
    } = body;

    if (!name || !email || !projectType) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing Brevo API key.' }, { status: 500 });
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        sender: { email: `${process.env.BREVO_SENDER_EMAIL}` },
        to: [{ email: `${process.env.BREVO_SENDER_EMAIL}`, name: 'Saswat Pattanaik' }],
        subject: `New Enquiry from ${name} (${projectType})`,
        htmlContent: `
          <h2>New Project Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Project Type:</strong> ${projectType}</p>
          <p><strong>Property Location:</strong> ${propertyLocation || 'N/A'}</p>
          <p><strong>Project Description:</strong> ${projectDescription || 'N/A'}</p>
          <p><strong>Preferred Contact:</strong> ${preferredContact || 'N/A'}</p>
          <p><strong>Timeline:</strong> ${Timeline || 'N/A'}</p>
        `,
        replyTo: { email, name }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Brevo API error:', error);
      return NextResponse.json({ error: error.message || JSON.stringify(error) || 'Failed to send enquiry.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Enquiry sent successfully.' });
  } catch (error) {
    console.error('Brevo send error:', error);
    if (error instanceof Response) {
      try {
        const errJson = await error.json();
        return NextResponse.json({ error: errJson.message || JSON.stringify(errJson) }, { status: 500 });
      } catch (e) {
        return NextResponse.json({ error: 'Unknown error (could not parse JSON)' }, { status: 500 });
      }
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
  }
} 