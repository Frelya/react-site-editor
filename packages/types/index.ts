export type PredefinedComponentProps<T> = {
    [key in keyof T]: T[key];
} & {
    maxChildren?: number;
};

export interface ComponentProp {
    type: PropsEnum;
    value: string;
}

export interface ComponentInfos {
    name: string;
    defaultProps: Record<string, any>;
}

export enum PropsEnum {
    TEXT = 'text',
    COLOR = 'color',
    SIZE = 'size'
}

export type ComponentChildren = React.ReactNode[];
