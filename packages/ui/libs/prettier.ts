import { format } from 'prettier';
const prettierOptions = { parser: 'typescript', singleQuote: true };

export function prettier(str: string) {
    return format(str, prettierOptions);
}
