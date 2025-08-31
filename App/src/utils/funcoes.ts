// Centralized constants for maintainability
const CONSTANTS = {
  INITIALS: {
    DEFAULT: 'UN', // Default for empty/invalid inputs
    MAX_LENGTH: 2, // Maximum length of initials
  },
  DISPLAY_NAME: {
    DEFAULT: '', // Default for empty/invalid inputs
    MAX_PARTS: 2, // Maximum name parts to display
  },
  CPF: {
    MAX_LENGTH: 14, // Maximum length of masked CPF (###.###.###-##)
    MASK_REGEX: [
      { pattern: /\D/g, replacement: '' }, // Remove non-digits
      { pattern: /(\d{3})(\d)/, replacement: '$1.$2' }, // Add first dot
      { pattern: /(\d{3})(\d)/, replacement: '$1.$2' }, // Add second dot
      { pattern: /(\d{3})(\d{1,2})$/, replacement: '$1-$2' }, // Add hyphen
    ],
  },
} as const;

// Utility for cleaning and normalizing strings
const cleanString = (input: string): string =>
  input
    .normalize('NFD') // Normalize accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, ' '); // Normalize multiple spaces

// Utility for splitting and filtering name parts
const getNameParts = (input: string): string[] =>
  cleanString(input).split(' ').filter(Boolean);

// Get initials from a full name
export function getInitials(fullName: string = ''): string {
  if (!fullName || typeof fullName !== 'string') {
    return CONSTANTS.INITIALS.DEFAULT;
  }

  const parts = getNameParts(fullName);
  if (parts.length === 0) {
    return CONSTANTS.INITIALS.DEFAULT;
  }

  const firstInitial = parts[0][0] ?? '';
  const lastInitial =
    parts.length > 1 ? parts[parts.length - 1][0] ?? '' : parts[0][1] ?? '';

  let initials = (firstInitial + lastInitial || firstInitial).toUpperCase();
  if (initials.length === 0) {
    return CONSTANTS.INITIALS.DEFAULT;
  }

  // Ensure exactly two characters
  return initials.length === 1
    ? initials.padEnd(CONSTANTS.INITIALS.MAX_LENGTH, firstInitial.toUpperCase())
    : initials.slice(0, CONSTANTS.INITIALS.MAX_LENGTH);
}

// Get display name from a full name
export function getDisplayName(fullName: string = ''): string {
  if (!fullName || typeof fullName !== 'string') {
    return CONSTANTS.DISPLAY_NAME.DEFAULT;
  }

  const parts = getNameParts(fullName);
  if (parts.length === 0) {
    return CONSTANTS.DISPLAY_NAME.DEFAULT;
  }

  if (parts.length === 1) {
    return parts[0];
  }

  // Return first and last name, or first two parts if more than two
  return parts.length <= CONSTANTS.DISPLAY_NAME.MAX_PARTS
    ? parts.join(' ')
    : `${parts[0]} ${parts[parts.length - 1]}`;
}

// Mask CPF input
export function maskCpf(value: string = ''): string {
  if (!value || typeof value !== 'string') {
    return '';
  }

  let result = value;
  for (const { pattern, replacement } of CONSTANTS.CPF.MASK_REGEX) {
    result = result.replace(pattern, replacement);
  }

  return result.slice(0, CONSTANTS.CPF.MAX_LENGTH);
}