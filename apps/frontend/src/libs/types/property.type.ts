import type { ComponentProp } from '@react-site-editor/types';

export interface PropertyProps extends Omit<ComponentProp, 'type'> {
    name: string;
    onChange: (e: React.SyntheticEvent, payload: ComponentProp['value']) => void;
}
