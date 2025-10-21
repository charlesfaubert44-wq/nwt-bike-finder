/**
 * Input Sanitization Utilities
 *
 * This module provides functions to sanitize user input and prevent XSS attacks.
 *
 * IMPORTANT: Install DOMPurify for production use:
 * npm install dompurify @types/dompurify isomorphic-dompurify
 */

/**
 * Sanitize plain text input
 * Removes HTML tags and special characters that could be used for XSS
 */
export function sanitizeText(input: string): string {
  if (!input) return '';

  return input
    .trim()
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove event handlers
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ');
}

/**
 * Sanitize email addresses
 * Validates and normalizes email format
 */
export function sanitizeEmail(email: string): string {
  if (!email) return '';

  return email
    .trim()
    .toLowerCase()
    .replace(/[^\w@.+-]/g, '');
}

/**
 * Sanitize phone numbers
 * Removes non-numeric characters except + and spaces
 */
export function sanitizePhone(phone: string): string {
  if (!phone) return '';

  return phone
    .trim()
    .replace(/[^\d+\s()-]/g, '');
}

/**
 * Sanitize URLs
 * Ensures URLs are safe and properly formatted
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';

  const trimmed = url.trim();

  // Block dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
  const lowerUrl = trimmed.toLowerCase();

  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      console.warn('Blocked dangerous URL protocol:', protocol);
      return '';
    }
  }

  // Only allow http, https, mailto
  if (!lowerUrl.match(/^(https?:\/\/|mailto:)/i)) {
    // If no protocol, assume https
    return `https://${trimmed}`;
  }

  return trimmed;
}

/**
 * Sanitize HTML content
 * For production, use DOMPurify: https://github.com/cure53/DOMPurify
 *
 * This is a basic implementation. For production use:
 * import DOMPurify from 'isomorphic-dompurify';
 * return DOMPurify.sanitize(html);
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';

  // Basic HTML sanitization (NOT production-ready)
  // Install DOMPurify for proper HTML sanitization
  console.warn('Using basic HTML sanitization. Install DOMPurify for production.');

  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed[^>]*>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '');
}

/**
 * Sanitize bike report data
 */
export interface BikeReportInput {
  brand?: string;
  model?: string;
  color?: string;
  features?: string;
  location?: {
    address?: string;
    city?: string;
  };
}

export function sanitizeBikeReport(input: BikeReportInput): BikeReportInput {
  return {
    brand: input.brand ? sanitizeText(input.brand) : undefined,
    model: input.model ? sanitizeText(input.model) : undefined,
    color: input.color ? sanitizeText(input.color) : undefined,
    features: input.features ? sanitizeText(input.features) : undefined,
    location: input.location
      ? {
          address: input.location.address ? sanitizeText(input.location.address) : undefined,
          city: input.location.city ? sanitizeText(input.location.city) : undefined,
        }
      : undefined,
  };
}

/**
 * Sanitize chat messages
 */
export function sanitizeChatMessage(message: string, maxLength: number = 500): string {
  if (!message) return '';

  return sanitizeText(message).slice(0, maxLength);
}

/**
 * Sanitize user profile data
 */
export interface UserProfileInput {
  displayName?: string;
  email?: string;
  phone?: string;
}

export function sanitizeUserProfile(input: UserProfileInput): UserProfileInput {
  return {
    displayName: input.displayName ? sanitizeText(input.displayName) : undefined,
    email: input.email ? sanitizeEmail(input.email) : undefined,
    phone: input.phone ? sanitizePhone(input.phone) : undefined,
  };
}

/**
 * Sanitize report reason
 */
export function sanitizeReportReason(reason: string, maxLength: number = 1000): string {
  if (!reason) return '';

  return sanitizeText(reason).slice(0, maxLength);
}

/**
 * Escape special characters for display
 * Use this when displaying user content in HTML
 */
export function escapeHtml(text: string): string {
  if (!text) return '';

  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}

/**
 * Validate and sanitize file names
 */
export function sanitizeFileName(fileName: string): string {
  if (!fileName) return '';

  return fileName
    .trim()
    // Remove path traversal attempts
    .replace(/\.\./g, '')
    .replace(/\//g, '')
    .replace(/\\/g, '')
    // Remove special characters except dots, dashes, underscores
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    // Limit length
    .slice(0, 255);
}

/**
 * Sanitize search queries
 */
export function sanitizeSearchQuery(query: string, maxLength: number = 100): string {
  if (!query) return '';

  return query
    .trim()
    // Remove special regex characters that could cause issues
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .slice(0, maxLength);
}

/**
 * Rate limiting helper - tracks attempts by key
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  key: string,
  maxAttempts: number = 5,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    const resetTime = now + windowMs;
    rateLimitStore.set(key, { count: 1, resetTime });
    return { allowed: true, remaining: maxAttempts - 1, resetTime };
  }

  if (record.count >= maxAttempts) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count++;
  return {
    allowed: true,
    remaining: maxAttempts - record.count,
    resetTime: record.resetTime,
  };
}

/**
 * Clean up old rate limit records
 */
export function cleanupRateLimits(): void {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Run cleanup every 5 minutes if in browser
if (typeof window !== 'undefined') {
  setInterval(cleanupRateLimits, 5 * 60 * 1000);
}

/**
 * Sanitize numeric input
 */
export function sanitizeNumber(
  value: string | number,
  min?: number,
  max?: number
): number | null {
  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num) || !isFinite(num)) {
    return null;
  }

  if (min !== undefined && num < min) {
    return min;
  }

  if (max !== undefined && num > max) {
    return max;
  }

  return num;
}

/**
 * Sanitize date input
 */
export function sanitizeDate(date: string | Date): string | null {
  try {
    const d = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(d.getTime())) {
      return null;
    }

    // Don't allow dates too far in the future or past
    const minDate = new Date('2000-01-01');
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    if (d < minDate || d > maxDate) {
      return null;
    }

    return d.toISOString();
  } catch {
    return null;
  }
}

/**
 * Content Security Policy helper
 * Add this to your Next.js middleware or headers config
 */
export const cspDirectives = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:', 'blob:'],
  'font-src': ["'self'", 'data:'],
  'connect-src': [
    "'self'",
    'https://*.firebaseio.com',
    'https://*.googleapis.com',
    'https://firebasestorage.googleapis.com',
  ],
  'frame-src': ["'none'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
};

export function buildCSP(): string {
  return Object.entries(cspDirectives)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
}
