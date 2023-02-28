export interface Component<T> {
    id: string;
    caller: React.FunctionComponent<T>;
    defaultProps: T;
}

export interface ComponentProp {
    type: PropType;
    value: string;
}

export interface TreeElement {
    id: string;
    props?: Record<string, any>;
    children?: TreeElement[];
}

type PropType = 'text' | 'color' | 'size';
