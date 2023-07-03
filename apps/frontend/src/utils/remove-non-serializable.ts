import type { ComponentInfos, ComponentProp, ControlType } from '@react-site-editor/types';

export type Specs = ComponentInfos['specs'];

const nonSerializableControls = ['callback'] as ControlType[];

const isComponentProp = (object: unknown): object is ComponentProp<unknown> => {
    return 'control' in Object(object);
};

const isSerializableComponentProp = (object: unknown): boolean => {
    return isComponentProp(object) && !nonSerializableControls.includes(object.control.type);
};

export function removeNonSerializable(
    specs: Specs
): [Specs, Specs] {
    const serializable = {} as Specs;
    const nonSerializable = {} as Specs;

    Object.entries(specs).forEach(([key, value]) => {
        if (isSerializableComponentProp(value)) {
            serializable[key] = value as Specs[typeof key];
            return;
        }

        nonSerializable[key] = value as Specs[typeof key];
    });

    return [serializable, nonSerializable];
}
