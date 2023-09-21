import axios from 'axios';
import { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { ApiResponse } from '@react-site-editor/types';

const methodsWithoutBody = ['GET', 'HEAD', 'OPTIONS'] as const;
const methodsWithBody = ['POST', 'PUT', 'PATCH', 'DELETE'] as const;

type RequestWithoutBody = {
    method: (typeof methodsWithoutBody)[number];
};

type RequestWithBody<TBody> = {
    method: (typeof methodsWithBody)[number];
    body: TBody;
};

type RequestArgs<TBody> = {
    url: string;
    method: RequestWithBody<TBody>['method'] | RequestWithoutBody['method'];
    params?: unknown;
} & (RequestWithoutBody | RequestWithBody<TBody>);

const hasBody = <TBody>(
    requestArgs: RequestArgs<TBody>
): requestArgs is RequestArgs<TBody> & { body: TBody } => {
    return methodsWithBody.includes(requestArgs.method as RequestWithBody<TBody>['method']);
};

const hasParams = <TBody>(
    requestArgs: RequestArgs<TBody>
): requestArgs is RequestArgs<TBody> & { params: unknown } => {
    return !!requestArgs.params;
};

const hasSucceeded = <TData>(
    response: ApiResponse<TData>
): response is ApiResponse<TData> & { success: true } => {
    return Object.prototype.hasOwnProperty.call(response, 'success') && response.success === true;
};

const isAxiosError = (error: unknown): error is AxiosError<ApiResponse> => {
    return error instanceof AxiosError;
};

const parseResponseError = (error: unknown): Omit<ApiResponse & { success: false }, 'success'> => {
    if (isAxiosError(error)) {
        const errorData: ApiResponse | null = error.response?.data ?? null;

        if (errorData === null || hasSucceeded(errorData)) {
            return {
                error: {
                    code: parseInt(error.code ?? '500'),
                    message: error.message,
                    path: error.request?.responseURL ?? '',
                    details: error
                },
                timestamp: new Date()
            };
        } else {
            return {
                error: errorData.error,
                timestamp: errorData.timestamp
            };
        }
    }

    return {
        error: {
            code: 500,
            message: 'An unknown error occurred.',
            path: '',
            details: error
        },
        timestamp: new Date()
    };
};

const client: AxiosInstance = axios.create({
    baseURL: import.meta.env.APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const makeRequest = async <TData, TBody = unknown>(
    args: RequestArgs<TBody>
): Promise<TData> => {
    const config: AxiosRequestConfig<TBody> = {
        url: args.url,
        method: args.method
    };

    if (hasBody(args)) {
        config.data = args.body;
    }

    if (hasParams(args)) {
        config.params = args.params;
    }

    let response: ApiResponse<TData> | null;

    try {
        const axiosResponse = await client.request<ApiResponse<TData>>(config);
        response = axiosResponse.data;
    } catch (error) {
        response = {
            success: false,
            ...parseResponseError(error)
        };
    }

    if (!hasSucceeded(response)) {
        throw new Error(response.error.message, {
            cause: response.error
        });
    }

    return response.data;
};
