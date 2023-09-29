import useSWR from 'swr';
import type { SWRConfiguration, RevalidatorOptions, SWRResponse } from 'swr';

const ERROR_CODES_WITH_NORMAL_RETRIES: number[] = [500];
const RETRIES_TIMEOUT = 2000;
const LOWER_RETRIES_LIMIT: RevalidatorOptions['retryCount'] = 3;

export type QueryArgs<TBody, TParams> = Partial<{
    body: TBody;
    params: TParams;
}> &
    (TBody extends undefined
        ? TParams extends undefined
            ? undefined
            : { params: TParams }
        : TParams extends undefined
        ? { body: TBody }
        : { body: TBody; params: TParams });

export type FetcherArgs<TBody = undefined, TParams = undefined> = [TBody, TParams];

type Query<TBody, TParams, TData> = (args?: QueryArgs<TBody, TParams>) => SWRResponse<TData, Error>;

type Fetcher<TBody, TParams, TData> = (args: FetcherArgs<TBody, TParams>) => Promise<TData>;

const getFetcherArgs = <TBody, TParams>(
    args?: QueryArgs<TBody, TParams>
): FetcherArgs<TBody, TParams> => {
    if (args) {
        if (!args.body && args.params) {
            return [{} as TBody, args.params];
        }

        if (args.body && !args.params) {
            return [args.body, {} as TParams];
        }

        if (args.body && args.params) {
            return [args.body, args.params];
        }
    }

    return [{} as TBody, {} as TParams];
};

const swrConfig: SWRConfiguration = {
    keepPreviousData: true,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (
            !ERROR_CODES_WITH_NORMAL_RETRIES.includes(error.status) &&
            retryCount > LOWER_RETRIES_LIMIT
        ) {
            return;
        }

        if (ERROR_CODES_WITH_NORMAL_RETRIES.includes(error.status)) {
            setTimeout(() => revalidate({ retryCount }), RETRIES_TIMEOUT);
        }
    }
};

export const queryFactory = <TBody = undefined, TParams = undefined, TData = unknown>(
    key: string,
    fetcher: Fetcher<TBody, TParams, TData>
): Query<TBody, TParams, TData> => {
    return (args?: QueryArgs<TBody, TParams>) => {
        const fetcherArgs = getFetcherArgs(args);
        return useSWR<TData, Error>(key, () => fetcher(fetcherArgs), swrConfig);
    };
};
