import type { ComponentProp } from '@react-site-editor/types';

export interface PropertyProps extends Omit<ComponentProp, 'type'> {
    name: string;
    onChange: (payload: ComponentProp['value'], event?: Event) => void;
}
