import { NextRequest, NextResponse } from 'next/server';

/**
 * Email Sending API Route
 *
 * This route sends email notifications using nodemailer.
 *
 * SETUP REQUIRED:
 * 1. Install nodemailer: npm install nodemailer
 * 2. Add to .env.local:
 *    SMTP_HOST=smtp.gmail.com
 *    SMTP_PORT=587
 *    SMTP_USER=your-email@gmail.com
 *    SMTP_PASSWORD=your-app-specific-password
 *    SMTP_FROM=noreply@ykbikefinder.com
 *
 * To enable this route:
 * 1. Uncomment the nodemailer import below
 * 2. Uncomment the createTransporter function
 * 3. Uncomment the email sending logic in POST handler
 */

// Uncomment after installing nodemailer
// import nodemailer from 'nodemailer';

// Uncomment to enable email sending
/*
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}
*/

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html, text } = await request.json();

    // Validate required fields
    if (!to || !subject || (!html && !text)) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, and html/text' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if email sending is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.warn('Email notification attempted but SMTP not configured');

      // In development, log the email instead of sending
      if (process.env.NODE_ENV === 'development') {
        console.log('==== EMAIL NOTIFICATION (DEV MODE) ====');
        console.log('To:', to);
        console.log('Subject:', subject);
        console.log('Text:', text);
        console.log('========================================');

        return NextResponse.json({
          success: true,
          message: 'Email logged (dev mode - SMTP not configured)',
          devMode: true
        });
      }

      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 503 }
      );
    }

    // Uncomment this section after installing nodemailer and setting up SMTP
    /*
    const transporter = createTransporter();

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      text,
      html,
    });

    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json({
      success: true,
      messageId: info.messageId
    });
    */

    // Temporary fallback - remove this when enabling nodemailer
    console.log('Email sending is disabled. Install nodemailer and configure SMTP to enable.');
    console.log('Email would be sent to:', to);

    return NextResponse.json({
      success: false,
      error: 'Email sending not yet configured. See route.ts for setup instructions.'
    }, { status: 503 });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
