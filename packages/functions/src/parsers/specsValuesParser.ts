import type { ComponentPropsSpecs, InferredProps } from '@react-site-editor/types';

export function specsValuesParser<T>(specs: ComponentPropsSpecs<T>) {
    const props = {} as InferredProps<T>;
    let key: keyof ComponentPropsSpecs<T>;

    for (key in specs) {
        const spec = specs[key];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        props[key] = spec.value ? spec.value : spec;
    }

    return props;
}
