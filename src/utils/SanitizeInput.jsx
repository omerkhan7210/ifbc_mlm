// ye saaray alag alag validation methods hain
// kahin pr bhi use krskte in sab ko
// Example validation functions
export function validateEmail(email) {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone) {
    // Basic phone number validation for US (10 or 11 digits)
    return /^[0-9]{10,12}$/.test(phone);
}

export function sanitizeInput(input) {
    // Example: trim whitespace and remove script tags
    return input.trim().replace(/<script.*?>.*?<\/script>/gi, "");
}

export function validateUsername(username) {
    // Basic username validation: alphanumeric, underscores, spaces, starts with a letter, 3-16 characters long
    return /^[a-zA-Z][a-zA-Z0-9_ ]{2,30}$/.test(username);
}

export function validateCasename(casename) {
    // Basic username validation: alphanumeric, underscores, spaces, starts with a letter, 3-16 characters long
    return /^[a-zA-Z][a-zA-Z0-9_ ]{2,30}$/.test(casename);
}
export function validateCity(city) {
    // Basic username validation: alphanumeric, underscores, spaces, starts with a letter, 3-16 characters long
    return /^[a-zA-Z][a-zA-Z0-9_ ]{2,30}$/.test(city);
}

export function validateZipcode(zipcode) {
    // Basic US zipcode validation (5 digits or 5 digits + 4 digits)
    // return /^\d{5}(-\d{4})?$/.test(zipcode);
    // U.S. based alphanumeric and 5-digit zipcode validation
    return /^(\d{5}(-\d{4})?|[A-Za-z0-9]{3,10}(-[A-Za-z0-9]{3,10})?)$/.test(
        zipcode
    );
}

export function validateStrongPassword(password) {
    // At least one uppercase letter
    const hasUpperCase = /[A-Z]/.test(password);
    // At least one lowercase letter
    const hasLowerCase = /[a-z]/.test(password);
    // At least one number
    const hasNumber = /[0-9]/.test(password);
    // At least one special character
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    // Minimum length of 8 characters
    const isValidLength = password.length >= 8;

    return (
        hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength
    );
}

// Validate LinkedIn profile URL
export function validateLinkedIn(linkedinUrl) {
    // LinkedIn profile URL validation
    return /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_-]+\/?$/.test(
        linkedinUrl
    );
}

// Validate general website URL
export function validateWebsiteUrl(websiteUrl) {
    // General website URL validation
    return /^(https?:\/\/)?([\w.-]+)(\.[a-zA-Z]{2,})([\/\w .-]*)*\/?$/.test(
        websiteUrl
    );
}

// Validate meeting URL (e.g., Zoom, Google Meet, Microsoft Teams)
export function validateMeetingUrl(meetingUrl) {
    // Meeting URL validation (supports Zoom, Google Meet, Microsoft Teams, etc.)
    return /^(https?:\/\/)?(www\.)?(zoom\.us|meet\.google\.com|teams\.microsoft\.com)\/[a-zA-Z0-9_-]+/.test(
        meetingUrl
    );
}

export function removeSpecificText(input, textToRemove) {
    const regex = new RegExp(textToRemove, "gi");
    return input.replace(regex, "").trim();
}

export function extractMinValue(range) {
    // Remove any non-numeric characters except for the dash
    const cleanedRange = range.replace(/[^0-9-]/g, "");
    // Split the range and convert the first part to a number
    const [minValue] = cleanedRange.split("-").map(Number);
    return minValue;
}

export function formatCurrency(value) {
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}