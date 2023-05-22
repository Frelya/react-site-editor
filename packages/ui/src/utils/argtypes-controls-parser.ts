import type { ArgTypes } from '@storybook/react';
import type { ComponentPropsSpecs, ExtendedSpecs } from '@react-site-editor/types';

function getArgType<T>(spec: ComponentPropsSpecs<T>[keyof T | keyof ExtendedSpecs]) {
    if (!spec.value || (spec.value && ['grid-template'].includes(spec.control.type))) {
        return {
            defaultValue: spec,
            control: 'object'
        };
    }

    const { value, control } = spec;
    const { type, ...controlProps } = control;

    if (['number', 'range', 'color', 'file'].includes(type)) {
        return {
            defaultValue: value,
            control: { type, ...controlProps }
        };
    }

    if (['callback'].includes(type)) {
        return {
            defaultValue: value
        };
    }

    return {
        defaultValue: value,
        control: type,
        ...controlProps
    };
}

export function argTypesControlsParser<T>(propsSpecs: ComponentPropsSpecs<T>) {
    const argTypes: Partial<ArgTypes<T>> = {};
    let key: keyof ComponentPropsSpecs<T>;

    for (key in propsSpecs) {
        const spec = propsSpecs[key];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        argTypes[key] = getArgType<T>(spec);
    }

    return argTypes;
}
