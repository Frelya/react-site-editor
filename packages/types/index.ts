export type ExposedComponentsMap = Record<string, any>;

export type UiIconName = `ui-${string}`;
// In frontend, type IconName = UiIconName + other icon names

export type ComponentPropsSpecs<T> = BaseSpecs<T> & ExtendedSpecs;

/**
 * Specs from component props
 */
export type BaseSpecs<T> = {
    [key in keyof T]: ComponentProp<T[key]>;
};

/**
 * Specs for practical usage
 */
export type ExtendedSpecs = {
    maxChildren?: number;
    iconName: UiIconName;
};

export interface ComponentProp<T> {
    value: T;
    control: Control<T>;
}

export type InferredProps<U> = {
    [key in keyof ComponentPropsSpecs<U>]: ComponentPropsSpecs<U>[key] extends ComponentProp<
        infer V
    >
        ? V
        : ComponentPropsSpecs<U>[key];
};

export interface ComponentInfos {
    name: string;
    group: string;
    specs: ComponentPropsSpecs<{ [key: string]: any }>;
}

export type CommonControls =
    | 'boolean'
    | 'number'
    | 'range'
    | 'object'
    | 'file'
    | 'radio'
    | 'check'
    | 'select'
    | 'multi-select'
    | 'text'
    | 'color'
    | 'date';

export type CustomControls = 'grid-template' | 'callback';

export type ControlType = CommonControls | CustomControls;

export type BaseControl = {
    type: ControlType;
};

export type BooleanControl = BaseControl & {
    type: 'boolean';
};

export type NumberControl = BaseControl & {
    type: 'number';
    min?: number;
    max?: number;
    step?: number;
};

export type RangeControl = BaseControl & {
    type: 'range';
    min?: number;
    max?: number;
    step?: number;
};

export type ObjectControl = BaseControl & {
    type: 'object';
};

export type FileControl = BaseControl & {
    type: 'file';
    accept?: string[];
};

export type RadioControl<T> = BaseControl & {
    type: 'radio';
    options: T[];
};

export type CheckControl<T> = BaseControl & {
    type: 'check';
    options: T[];
};

export type SelectControl<T> = BaseControl & {
    type: 'select';
    options: T[];
};

export type MultiSelectControl<T> = BaseControl & {
    type: 'multi-select';
    options: T[];
};

export type TextControl = BaseControl & {
    type: 'text';
};

export type ColorControl = BaseControl & {
    type: 'color';
};

export type DateControl = BaseControl & {
    type: 'date';
};

export type GridTemplateControl = BaseControl & {
    type: 'grid-template';
    flowCountPropName: string;
};

export type CallbackControl = BaseControl & {
    type: 'callback';
};

export type Control<T> =
    | BooleanControl
    | NumberControl
    | RangeControl
    | ObjectControl
    | FileControl
    | RadioControl<T>
    | CheckControl<T>
    | SelectControl<T>
    | MultiSelectControl<T>
    | TextControl
    | ColorControl
    | DateControl
    | GridTemplateControl
    | CallbackControl;
