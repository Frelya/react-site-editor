import type { PredefinedComponentProps, ComponentProp } from '@react-site-editor/types';

export function argsParser<T>(props: PredefinedComponentProps<T>) {
    type InferredProps<U> = {
        [key in keyof PredefinedComponentProps<U>]: PredefinedComponentProps<U>[key] extends ComponentProp<infer V> ? V : PredefinedComponentProps<U>[key];
    }

    const args = {} as InferredProps<T>;

    let key: keyof PredefinedComponentProps<T>;

    for (key in props) {
        const prop = props[key];
        // @ts-ignore
        args[key] = prop.value ? prop.value : prop;
    }

    return args;
}
