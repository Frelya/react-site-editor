import type { ComponentChildren, ComponentProp } from '@react-site-editor/types';

export interface Button2Props {
    text: ComponentProp;
    fontSize: ComponentProp;
    onClick: () => void;
    children?: ComponentChildren;
}
