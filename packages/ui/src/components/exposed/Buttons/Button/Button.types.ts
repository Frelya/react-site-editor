import type { ComponentChildren, ComponentProp } from '@react-site-editor/types';

export interface ButtonProps {
    text: ComponentProp;
    fontSize: ComponentProp;
    onClick: () => void;
    children?: ComponentChildren;
}
