// Cal.com Configuration
// Update this URL with your actual Cal.com booking link
export const CAL_BOOKING_URL = "https://cal.com/focuseia/consultation";

// Default consultation duration in minutes
export const CONSULTATION_DURATION = 30;

// Generate a booking link with pre-filled guest info
export const generateBookingUrl = (email?: string, name?: string): string => {
  const url = new URL(CAL_BOOKING_URL);
  
  if (email) {
    url.searchParams.set("email", email);
  }
  if (name) {
    url.searchParams.set("name", name);
  }
  
  return url.toString();
};
