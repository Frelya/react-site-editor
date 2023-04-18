import { Options, format } from 'prettier';

const prettierOptions: Options = {
    bracketSameLine: true,
    printWidth: 100,
    proseWrap: 'always',
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'none',
    useTabs: false,
    parser: 'typescript'
};

export function prettier(str: string, options: Options = {}) {
    return format(str, { ...prettierOptions, ...options });
}
