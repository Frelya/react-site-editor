export type UiIconName = `ui-${string}`;
// In frontend, type IconName = UiIconName + other icon names

export type PredefinedComponentProps<T> = {
    [key in keyof T]: T[key];
} & {
    maxChildren?: number;
    iconName: UiIconName;
};

export interface ComponentProp {
    type: PropsEnum;
    value: string | number;
    min?: number;
    max?: number;
}

export interface ComponentInfos {
    name: string;
    group: string;
    defaultProps: Record<string, any>;
}

export enum PropsEnum {
    TEXT = 'text',
    COLOR = 'color',
    SIZE = 'size',
    NUMBER = 'number',
    GRID_TEMPLATE = 'grid-template',
}

export type ComponentChildren = React.ReactNode[];
