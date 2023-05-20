import type { ArgTypes } from '@storybook/react';
import type { PredefinedComponentProps, ComponentProp } from '@react-site-editor/types';

export function argTypesParser<T>(defaultProps: PredefinedComponentProps<T>) {
    const argTypes: Partial<ArgTypes<PredefinedComponentProps<T>>> = {};

    Object.entries(defaultProps).forEach(([key, prop]) => {
        if (['children', 'maxChildren', 'iconName'].includes(key)) {
            argTypes[key] = { defaultValue: prop };
            return;
        }

        const { value, control, required } = prop as ComponentProp;
        const { type, ...controlProps } = control;

        if (['callback'].includes(type)) {
            argTypes[key] = {
                action: 'clicked',
                defaultValue: value
            };
            return;
        }

        if (['number', 'range', 'color', 'file'].includes(type)) {
            argTypes[key] = {
                defaultValue: value,
                control: { type, ...controlProps }
            }
        } else {
            argTypes[key] = {
                defaultValue: value,
                control: type,
                ...controlProps
            }
        }
    });

    return argTypes;
}
