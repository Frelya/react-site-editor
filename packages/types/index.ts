export interface Component<T> {
    caller: React.FunctionComponent;
    defaultProps: {
        [prop: string]: T;
    };
}
