export type ResponseError = {
    readonly code: number;
    readonly message: string;
    readonly path: string;
    readonly details: unknown;
};
