export function kebabToSnake(str: string): string {
    const pattern = /-/g;
    return str.replace(pattern, '_');
}
