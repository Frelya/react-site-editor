import { pascalToSnake } from './pascalToSnake';
import { kebabToPascal } from './kebabToPascal';
import { pascalToKebab } from './pascalToKebab';
import { pascalToSpaced } from './pascalToSpaced';
import { innerContentOfHtmlDiv } from './innerContentOfHtmlDiv';

export { pascalToSnake, kebabToPascal, pascalToKebab, pascalToSpaced, innerContentOfHtmlDiv };

// TODO: move definitions below into dedicated files if possible

export const config = {
    prefix: '__reb'
};

export function capitalize(str: string): string {
    return [str[0].toUpperCase(), str.substring(1)].join('');
}

export function setPrefix(value: string) {
    config.prefix = ['__', value].join('');
}

export function prefix(value: string) {
    return [config.prefix, value].join('__');
}

export function file2base64(file: File): Promise<string> {
    return new Promise((res) => {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onloadend = () => res(fr.result as string);
    });
}
