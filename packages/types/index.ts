export interface PredefinedComponent {
    caller: React.FunctionComponent;
    defaultProps: PredefinedComponentProps;
}

export interface PredefinedComponentProps {
    [key: string]: any;
    maxChildren?: number;
}

export interface ComponentProp {
    type: PropType;
    value: string;
}

export type ComponentsMap<T> = Record<string, T>;

export type PropType = 'text' | 'color' | 'size';

export type ComponentChildren = React.ReactNode[];
