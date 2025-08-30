export function getInitials(fullName?: string): string {
  if (!fullName) return 'U';
  const cleaned = fullName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  const first = parts[0][0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? '' : (parts[0][1] ?? '');
  const initials = (first + last || first || 'U').toUpperCase();
  return initials.length === 1 ? initials.padEnd(2, first.toUpperCase()) : initials;
}

export function getDisplayName(fullName?: string): string | undefined {
  if (!fullName) return undefined;
  const trimmed = fullName.trim().replace(/\s+/g, ' ');
  const parts = trimmed.split(' ').filter(Boolean);
  if (parts.length === 0) return undefined;
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]} ${parts[1]}`;
  return `${parts[0]} ${parts[parts.length - 1]}`;
}

export const maskCpf = (value: string) => {
    return value
        .replace(/\D/g, "") 
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .slice(0, 14); 
};
