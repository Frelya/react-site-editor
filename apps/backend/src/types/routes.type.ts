type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type Paths = {
    [name: string]: string | string[];
}

type Endpoints = {
    [method in Method]?: Paths;
};

export type Routes = {
    PREFIX: string | string[];
} & Endpoints;
