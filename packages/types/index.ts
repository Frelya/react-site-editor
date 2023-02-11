export interface Component<T> {
    caller: React.FunctionComponent;
    defaultProps: {
        [prop: string]: T;
    };
}

export interface ComponentProp {
    type: PropType;
    value: string;
}

type PropType = 'text' | 'color' | 'size';
