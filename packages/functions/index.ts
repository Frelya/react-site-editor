export * from './src/stringutils';

export * from './src/others';

// TODO: move definitions below into dedicated files if possible

export const config = {
    prefix: '__reb'
};

export function setPrefix(value: string) {
    config.prefix = ['__', value].join('');
}

export function prefix(value: string) {
    return [config.prefix, value].join('__');
}
