export interface Component<T> {
    caller: React.FunctionComponent;
    defaultProps: T;
}

export interface ComponentProp {
    type: PropType;
    value: string;
}

type PropType = 'text' | 'color' | 'size';
