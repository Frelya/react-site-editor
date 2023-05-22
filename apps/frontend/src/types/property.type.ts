import type { ComponentProp, Control } from '@react-site-editor/types';

export interface PropertyProps<T, U = Control<unknown>>
    extends Omit<ComponentProp<T>, 'control' | 'required'> {
    name: string;
    value: T;
    spec: U;
    onChange: (payload: T, event?: Event) => void;
}
