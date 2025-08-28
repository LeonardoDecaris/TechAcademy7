export function getDisplayName(userName?: string): string {
    if (!userName) return 'Usuário';
    const parts = userName.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `${parts[0]} ${parts[1]}`;
    return `${parts[0]} ${parts[parts.length - 1]}`;
}

export function getInitials(userName?: string): string {
    if (!userName) return '';
    const parts = userName.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    if (parts.length === 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}