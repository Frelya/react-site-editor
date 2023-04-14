import type { ComponentChildren, ComponentProp } from '@react-site-editor/types';

export interface Button3Props {
    text: ComponentProp;
    fontSize: ComponentProp;
    onClick: () => void;
    children?: ComponentChildren;
}
