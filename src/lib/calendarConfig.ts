// Native Calendar Configuration
export const DEFAULT_SLOT_DURATION = 30; // minutes
export const MIN_BOOKING_ADVANCE_HOURS = 1; // minimum hours in advance to book
export const MAX_BOOKING_ADVANCE_DAYS = 60; // maximum days in advance to book

// Legacy Cal.com fallback URL (used in email templates)
export const CAL_BOOKING_URL = "https://cal.com/focuseia/consultation";

// Generate a booking link with pre-filled guest info (legacy, for emails)
export const generateBookingUrl = (email?: string, name?: string): string => {
  const url = new URL(CAL_BOOKING_URL);
  if (email) url.searchParams.set("email", email);
  if (name) url.searchParams.set("name", name);
  return url.toString();
};
