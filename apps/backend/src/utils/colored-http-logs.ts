enum MethodsColorsMap {
    GET = '\x1b[32m',
    POST = '\x1b[33m',
    PUT = '\x1b[36m',
    DELETE = '\x1b[31m',
    PATCH = '\x1b[35m',
    OPTIONS = '\x1b[34m',
    HEAD = '\x1b[37m'
}

type HttpMethod = keyof typeof MethodsColorsMap;

const getMethodColor = (method: HttpMethod) => {
    return MethodsColorsMap[method] || '\x1b[0m';
};

const getStatusCodeColor = (statusCode: number) => {
    if (statusCode >= 500) {
        return '\x1b[33m';
    }

    if (statusCode >= 400) {
        return '\x1b[31m';
    }

    if (statusCode >= 300) {
        return '\x1b[36m';
    }

    if (statusCode >= 200) {
        return '\x1b[32m';
    }

    return '\x1b[0m';
};

export function colorMethod(method: HttpMethod) {
    return `${getMethodColor(method)}${method}\x1b[0m`;
}

export function colorStatusCode(statusCode: number) {
    return `${getStatusCodeColor(statusCode)}${statusCode}\x1b[0m`;
}

export function colorNotImportant(text: string) {
    return `\x1b[2m${text}\x1b[0m`;
}
