const CONSTANTS = {
  INITIALS: {
    DEFAULT: '', 
    MAX_LENGTH: 2, 
  },
  DISPLAY_NAME: {
    DEFAULT: '',
    MAX_PARTS: 2, 
  },
  CPF: {
    MAX_LENGTH: 14,
    MASK_REGEX: [
      { pattern: /\D/g, replacement: '' }, 
      { pattern: /(\d{3})(\d)/, replacement: '$1.$2' }, 
      { pattern: /(\d{3})(\d)/, replacement: '$1.$2' }, 
      { pattern: /(\d{3})(\d{1,2})$/, replacement: '$1-$2' },
    ],
  },
} as const;

const cleanString = (input: string): string =>
  input
    .normalize('NFD') 
    .replace(/[\u0300-\u036f]/g, '')
    .trim() 
    .replace(/\s+/g, ' ');

const getNameParts = (input: string): string[] =>
  cleanString(input).split(' ').filter(Boolean);

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

/**
 * Get display name from a full name
 * @param fullName string
 * @returns string
 */
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

  return parts.length <= CONSTANTS.DISPLAY_NAME.MAX_PARTS
    ? parts.join(' ')
    : `${parts[0]} ${parts[parts.length - 1]}`;
}

/**
 * Mascarar CPF
 * @param value string
 * @returns string
 */
export function maskCpf(value: string = ''): string {
  if (!value || typeof value !== 'string') {
    return '';
  }

  let digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(
    9,
    11
  )}`;
}

/**
 * Formata uma data/hora para o padrão brasileiro.
 * @param dateInput Data em string ou Date
 * @param options Define se retorna 'data', 'hora' ou 'dataHora'
 * @returns string formatada ou '--'
 */
export function formatDateTime(
  dateInput?: string | Date | null,
  options: 'data' | 'hora' | 'dataHora' = 'dataHora'
): string {
  if (!dateInput) return 'sem horario';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return 'sem horario';

  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  const hora = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  if (options === 'data') return `${dia}/${mes}/${ano}`;
  if (options === 'hora') return `${hora}:${min}`;
  return `${dia}/${mes}/${ano} ${hora}:${min}`;
}
