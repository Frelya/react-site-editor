export function pascalToSpaced(s: string) {
    const pattern = /([A-Z0-9])/g;
    return s.replace(pattern, ' $1').trim();
}
