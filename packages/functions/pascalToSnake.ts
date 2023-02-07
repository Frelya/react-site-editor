export function pascalToSnake(s: string) {
    const pattern = /\.?([A-Z]+[a-z]*)/g;
    return s.replace(pattern, function (substring, ...args) {
        substring = substring.toLowerCase();
        if (args[1] > 0) {
            substring = '_' + substring;
        }
        return substring;
    });
}
