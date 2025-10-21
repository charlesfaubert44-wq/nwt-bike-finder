# Email Notifications Setup Guide

This guide explains how to enable email notifications for bike matches in YK Bike Finder.

## Overview

Email notifications are sent when:
- A new potential match is found between a stolen and found bike
- A match is resolved (reunited or false alarm)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install nodemailer @types/nodemailer
```

### 2. Configure Environment Variables

Add the following to your `.env.local` file:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@ykbikefinder.com
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 3. Set Up Email Service

#### Option A: Gmail (Development/Small Scale)

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password
3. Use these settings:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-16-char-app-password
   ```

**Note:** Gmail has sending limits (500 emails/day for free accounts). Not recommended for production.

#### Option B: SendGrid (Recommended for Production)

1. Sign up at https://sendgrid.com
2. Create an API key
3. Update your `.env.local`:
   ```env
   SENDGRID_API_KEY=your-api-key
   SMTP_FROM=noreply@ykbikefinder.com
   ```
4. Modify `src/app/api/notifications/send-email/route.ts` to use SendGrid SDK

#### Option C: AWS SES (Best for High Volume)

1. Set up AWS SES: https://aws.amazon.com/ses/
2. Verify your domain
3. Generate SMTP credentials
4. Use SMTP settings or AWS SDK

#### Option D: Mailgun

1. Sign up at https://www.mailgun.com
2. Get your SMTP credentials
3. Update environment variables

### 4. Enable the Email Route

Edit `src/app/api/notifications/send-email/route.ts`:

1. Uncomment the nodemailer import:
   ```typescript
   import nodemailer from 'nodemailer';
   ```

2. Uncomment the `createTransporter` function

3. Uncomment the email sending logic in the POST handler

4. Remove or comment out the temporary fallback

### 5. Trigger Notifications

Notifications are automatically triggered when matches are created. The logic is in:
- `src/lib/imageMatching.ts` - When matches are found
- Match creation workflow in your bike reporting flow

To manually trigger a test notification, you can call:

```typescript
import { sendMatchNotification } from '@/lib/notifications';
import { getUser, getStolenBike, getFoundBike } from '@/lib/db';

// In your matching logic
const user = await getUser(stolenBike.userId);
if (user?.email) {
  await sendMatchNotification(
    user.email,
    user.displayName,
    stolenBike,
    foundBike,
    match
  );
}
```

## Email Templates

The system includes professional HTML email templates with:
- Responsive design
- Match score display
- Bike information comparison
- Direct links to view bikes
- Safety warnings
- Clear call-to-action buttons

Templates are defined in `src/lib/notifications.ts`:
- `generateMatchEmail()` - New match notification
- `generateMatchResolvedEmail()` - Match resolution notification

## Testing

### Test in Development Mode

When SMTP is not configured, emails are logged to console:

```bash
npm run dev
# Trigger a match
# Check console output for email content
```

### Test with Real Email

1. Configure SMTP (use Gmail for testing)
2. Create a test stolen bike report
3. Create a matching found bike report
4. Check your email inbox

### Test API Route Directly

```bash
curl -X POST http://localhost:3000/api/notifications/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Test Email",
    "text": "This is a test",
    "html": "<p>This is a test</p>"
  }'
```

## Troubleshooting

### Emails Not Sending

1. Check environment variables are set correctly
2. Verify SMTP credentials
3. Check console logs for errors
4. Ensure nodemailer is installed
5. Check spam folder

### Gmail Blocking

If using Gmail and emails aren't sending:
- Verify 2FA is enabled
- Use App Password (not regular password)
- Check "Less secure app access" settings (if not using App Password)
- Check Gmail's sending limits

### Rate Limiting

Production services have rate limits:
- Gmail: 500/day
- SendGrid Free: 100/day
- Mailgun Free: 5,000/month
- AWS SES: Pay per email (very cheap)

### Security Best Practices

1. **Never commit credentials** to git
2. Use environment variables
3. Rotate passwords/API keys regularly
4. Use app-specific passwords (not main password)
5. Enable 2FA on email service accounts
6. Monitor sending for abuse
7. Implement rate limiting in your app

## Future Enhancements

Consider adding:
- Email verification for users
- Unsubscribe links (required for bulk email)
- Email preferences (frequency, types)
- Email delivery tracking
- Bounce handling
- SMS notifications (Twilio)
- Push notifications (Firebase Cloud Messaging)
- Email templates for other events:
  - Bike reported as stolen
  - Bike marked as resolved
  - New message in chat
  - Account verification

## Alternative: Firebase Cloud Functions

Instead of Next.js API routes, you could use Firebase Cloud Functions:

```typescript
// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

export const sendMatchEmail = functions.firestore
  .document('matches/{matchId}')
  .onCreate(async (snap, context) => {
    // Send email when new match is created
  });
```

Benefits:
- Runs in Firebase environment
- Automatic scaling
- No Next.js server needed
- Integrates with Firestore triggers

## Support

For issues with email setup:
1. Check the logs in `src/app/api/notifications/send-email/route.ts`
2. Verify environment variables with `console.log(process.env.SMTP_HOST)`
3. Test SMTP connection separately
4. Check email service documentation
5. Review nodemailer documentation: https://nodemailer.com

## Cost Considerations

| Service | Free Tier | Paid Starting |
|---------|-----------|---------------|
| Gmail | 500/day | N/A |
| SendGrid | 100/day | $19.95/month |
| Mailgun | 5,000/month | $35/month |
| AWS SES | 62,000/month | $0.10/1000 |
| Postmark | 100/month | $15/month |

For YK Bike Finder's expected volume (< 100 emails/day), any free tier should suffice initially.
