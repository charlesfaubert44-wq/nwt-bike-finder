/**
 * Input sanitization and validation utilities
 */

/**
 * Sanitize string input to prevent XSS attacks
 */
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers like onclick=
    .substring(0, 1000); // Limit length
};

/**
 * Sanitize email input
 */
export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase().substring(0, 254);
};

/**
 * Sanitize phone number (remove non-numeric characters except + and -)
 */
export const sanitizePhone = (phone: string): string => {
  return phone.replace(/[^\d+\-() ]/g, '').substring(0, 20);
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format (basic)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d+\-() ]{10,20}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate date string (YYYY-MM-DD or ISO format)
 */
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

/**
 * Validate if date is not in the future
 */
export const isDateNotFuture = (dateString: string): boolean => {
  const date = new Date(dateString);
  const now = new Date();
  return date <= now;
};

/**
 * Validate bike form data
 */
export interface BikeFormErrors {
  photos?: string;
  color?: string;
  type?: string;
  features?: string;
  location?: string;
  city?: string;
}

export interface StolenBikeFormErrors extends BikeFormErrors {
  brand?: string;
  model?: string;
  size?: string;
  dateStolen?: string;
}

export interface FoundBikeFormErrors extends BikeFormErrors {
  condition?: string;
  dateFound?: string;
}

/**
 * Validate stolen bike form
 */
export const validateStolenBikeForm = (formData: any): StolenBikeFormErrors => {
  const errors: StolenBikeFormErrors = {};

  if (!formData.photos || formData.photos.length === 0) {
    errors.photos = 'At least one photo is required';
  } else if (formData.photos.length > 10) {
    errors.photos = 'Maximum 10 photos allowed';
  }

  if (!formData.brand || formData.brand.trim().length < 2) {
    errors.brand = 'Brand is required (minimum 2 characters)';
  } else if (formData.brand.length > 50) {
    errors.brand = 'Brand name is too long (maximum 50 characters)';
  }

  if (!formData.model || formData.model.trim().length < 1) {
    errors.model = 'Model is required';
  } else if (formData.model.length > 50) {
    errors.model = 'Model name is too long (maximum 50 characters)';
  }

  if (!formData.color || formData.color.trim().length < 2) {
    errors.color = 'Color is required';
  } else if (formData.color.length > 30) {
    errors.color = 'Color description is too long';
  }

  if (!formData.type) {
    errors.type = 'Bike type is required';
  }

  if (!formData.size || formData.size.trim().length < 1) {
    errors.size = 'Size is required';
  }

  if (formData.features && formData.features.length > 500) {
    errors.features = 'Features description is too long (maximum 500 characters)';
  }

  if (!formData.location?.city || formData.location.city.trim().length === 0) {
    errors.city = 'City is required';
  }

  if (!formData.location?.address || formData.location.address.trim().length === 0) {
    errors.location = 'Location address is required';
  }

  if (!formData.dateStolen) {
    errors.dateStolen = 'Date stolen is required';
  } else if (!isValidDate(formData.dateStolen)) {
    errors.dateStolen = 'Invalid date format';
  } else if (!isDateNotFuture(formData.dateStolen)) {
    errors.dateStolen = 'Date cannot be in the future';
  }

  return errors;
};

/**
 * Validate found bike form
 */
export const validateFoundBikeForm = (formData: any): FoundBikeFormErrors => {
  const errors: FoundBikeFormErrors = {};

  if (!formData.photos || formData.photos.length === 0) {
    errors.photos = 'At least one photo is required';
  } else if (formData.photos.length > 10) {
    errors.photos = 'Maximum 10 photos allowed';
  }

  if (!formData.color || formData.color.trim().length < 2) {
    errors.color = 'Color is required';
  } else if (formData.color.length > 30) {
    errors.color = 'Color description is too long';
  }

  if (!formData.type) {
    errors.type = 'Bike type is required';
  }

  if (!formData.condition) {
    errors.condition = 'Condition is required';
  }

  if (formData.features && formData.features.length > 500) {
    errors.features = 'Features description is too long (maximum 500 characters)';
  }

  if (!formData.location?.city || formData.location.city.trim().length === 0) {
    errors.city = 'City is required';
  }

  if (!formData.location?.address || formData.location.address.trim().length === 0) {
    errors.location = 'Location address is required';
  }

  if (!formData.dateFound) {
    errors.dateFound = 'Date found is required';
  } else if (!isValidDate(formData.dateFound)) {
    errors.dateFound = 'Invalid date format';
  } else if (!isDateNotFuture(formData.dateFound)) {
    errors.dateFound = 'Date cannot be in the future';
  }

  return errors;
};

/**
 * Check if form has any errors
 */
export const hasErrors = (errors: Record<string, any>): boolean => {
  return Object.keys(errors).length > 0;
};
