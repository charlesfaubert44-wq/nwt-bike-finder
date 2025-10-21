/**
 * Email Notification System for YK Bike Finder
 *
 * This module provides email notification functionality for match alerts.
 *
 * SETUP INSTRUCTIONS:
 * 1. Install nodemailer: npm install nodemailer @types/nodemailer
 * 2. Set up environment variables in .env.local:
 *    - SMTP_HOST (e.g., smtp.gmail.com)
 *    - SMTP_PORT (e.g., 587)
 *    - SMTP_USER (your email)
 *    - SMTP_PASSWORD (app-specific password)
 *    - NEXT_PUBLIC_APP_URL (e.g., https://ykbikefinder.com)
 *
 * For Gmail:
 * - Enable 2FA
 * - Generate app-specific password
 * - Use smtp.gmail.com:587
 *
 * Alternative: Use services like SendGrid, Mailgun, or AWS SES
 */

import { StolenBike, FoundBike, Match, User } from '@/types';

export interface EmailNotificationData {
  to: string;
  subject: string;
  html: string;
  text: string;
}

/**
 * Generate email for new match notification
 */
export function generateMatchEmail(
  userEmail: string,
  userName: string,
  stolenBike: StolenBike,
  foundBike: FoundBike,
  match: Match
): EmailNotificationData {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const matchUrl = `${appUrl}/bikes/stolen/${stolenBike.id}`;
  const foundBikeUrl = `${appUrl}/bikes/found/${foundBike.id}`;
  const similarityPercent = Math.round(match.similarityScore * 100);

  const subject = `Potential Match Found for Your Stolen ${stolenBike.brand} ${stolenBike.model}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #2D5F5D 0%, #4A90A4 100%);
      color: white;
      padding: 30px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e5e7eb;
      border-top: none;
    }
    .match-score {
      background: #E8B44F;
      color: #1F2937;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      margin: 20px 0;
    }
    .bike-info {
      background: #F3F4F6;
      padding: 20px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .bike-info h3 {
      margin-top: 0;
      color: #2D5F5D;
    }
    .button {
      display: inline-block;
      background: #2D5F5D;
      color: white !important;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      margin: 10px 5px;
      font-weight: 600;
    }
    .button:hover {
      background: #234947;
    }
    .footer {
      background: #F9FAFB;
      padding: 20px;
      border: 1px solid #e5e7eb;
      border-top: none;
      border-radius: 0 0 8px 8px;
      text-align: center;
      font-size: 14px;
      color: #6B7280;
    }
    .warning {
      background: #FEF3C7;
      border-left: 4px solid #E8B44F;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🚴 Potential Match Found!</h1>
    <p>YK Bike Finder</p>
  </div>

  <div class="content">
    <p>Hi ${userName},</p>

    <p>Great news! We found a bike that might match your stolen bike report.</p>

    <div class="match-score">
      ${similarityPercent}% Match
    </div>

    <div class="bike-info">
      <h3>Your Stolen Bike</h3>
      <p><strong>${stolenBike.brand} ${stolenBike.model}</strong></p>
      <p>Color: ${stolenBike.color} | Type: ${stolenBike.type}</p>
      <p>Stolen from: ${stolenBike.location.city}</p>
    </div>

    <div class="bike-info">
      <h3>Found Bike</h3>
      <p>Color: ${foundBike.color} | Type: ${foundBike.type} | Condition: ${foundBike.condition || 'Unknown'}</p>
      <p>Found in: ${foundBike.location.city}</p>
      <p>Still there: ${foundBike.stillThere ? 'Yes' : 'No (moved to safe location)'}</p>
    </div>

    <div class="warning">
      <strong>⚠️ Important:</strong> Please verify this is your bike before arranging pickup. Check photos carefully and ask the finder specific questions about unique features.
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${matchUrl}" class="button">View Your Bike</a>
      <a href="${foundBikeUrl}" class="button">View Found Bike</a>
    </div>

    <p style="margin-top: 30px;">
      <strong>Next Steps:</strong>
    </p>
    <ol>
      <li>Review the found bike's photos</li>
      <li>Contact the finder through our secure chat</li>
      <li>Verify ownership details</li>
      <li>Arrange a safe pickup location</li>
    </ol>
  </div>

  <div class="footer">
    <p>This is an automated notification from YK Bike Finder</p>
    <p>Helping reunite stolen bikes with their owners in Yellowknife, NWT</p>
    <p><a href="${appUrl}" style="color: #2D5F5D;">Visit YK Bike Finder</a></p>
  </div>
</body>
</html>
  `;

  const text = `
Hi ${userName},

Great news! We found a potential match for your stolen bike.

MATCH SCORE: ${similarityPercent}%

YOUR STOLEN BIKE:
- ${stolenBike.brand} ${stolenBike.model}
- Color: ${stolenBike.color}
- Type: ${stolenBike.type}
- Stolen from: ${stolenBike.location.city}

FOUND BIKE:
- Color: ${foundBike.color}
- Type: ${foundBike.type}
- Condition: ${foundBike.condition || 'Unknown'}
- Found in: ${foundBike.location.city}
- Still there: ${foundBike.stillThere ? 'Yes' : 'No'}

NEXT STEPS:
1. Review the found bike's photos: ${foundBikeUrl}
2. View your bike report: ${matchUrl}
3. Contact the finder through our secure chat
4. Verify ownership details
5. Arrange a safe pickup location

⚠️ Important: Please verify this is your bike before arranging pickup.

Visit YK Bike Finder: ${appUrl}

---
This is an automated notification from YK Bike Finder
  `.trim();

  return {
    to: userEmail,
    subject,
    html,
    text
  };
}

/**
 * Send email notification via API route
 * This function should be called when a new match is created
 */
export async function sendMatchNotification(
  userEmail: string,
  userName: string,
  stolenBike: StolenBike,
  foundBike: FoundBike,
  match: Match
): Promise<{ success: boolean; error?: string }> {
  try {
    const emailData = generateMatchEmail(userEmail, userName, stolenBike, foundBike, match);

    // Call Next.js API route to send email
    const response = await fetch('/api/notifications/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to send notification:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Generate email for resolved match
 */
export function generateMatchResolvedEmail(
  userEmail: string,
  userName: string,
  stolenBike: StolenBike,
  wasReunited: boolean
): EmailNotificationData {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const subject = wasReunited
    ? `Congratulations! Your ${stolenBike.brand} ${stolenBike.model} Was Reunited!`
    : `Match Update for Your ${stolenBike.brand} ${stolenBike.model}`;

  const html = wasReunited
    ? `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #3D7C47 0%, #4A90A4 100%);
      color: white;
      padding: 30px;
      border-radius: 8px;
      text-align: center;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e5e7eb;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎉 Bike Reunited!</h1>
  </div>
  <div class="content">
    <p>Hi ${userName},</p>
    <p>Congratulations! We're thrilled to hear that you've been reunited with your ${stolenBike.brand} ${stolenBike.model}!</p>
    <p>Thank you for using YK Bike Finder. Your success story helps build trust in our community.</p>
    <p>Stay safe and enjoy riding!</p>
    <p>- The YK Bike Finder Team</p>
  </div>
</body>
</html>
    `
    : `
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
  <h2>Match Update</h2>
  <p>Hi ${userName},</p>
  <p>The match for your ${stolenBike.brand} ${stolenBike.model} has been updated to false alarm.</p>
  <p>Don't worry - we'll continue monitoring for new matches.</p>
  <p><a href="${appUrl}">Visit YK Bike Finder</a></p>
</body>
</html>
    `;

  const text = wasReunited
    ? `Hi ${userName},\n\nCongratulations! We're thrilled to hear that you've been reunited with your ${stolenBike.brand} ${stolenBike.model}!\n\nThank you for using YK Bike Finder.\n\n- The YK Bike Finder Team`
    : `Hi ${userName},\n\nThe match for your ${stolenBike.brand} ${stolenBike.model} has been updated to false alarm.\n\nDon't worry - we'll continue monitoring for new matches.\n\nVisit: ${appUrl}`;

  return {
    to: userEmail,
    subject,
    html,
    text
  };
}
