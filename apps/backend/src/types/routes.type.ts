type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type Paths = Record<string, string | string[]>;

type Endpoints = Partial<Record<Method, Paths>>;

export type Routes = {
    PREFIX: string | string[];
} & Endpoints;
