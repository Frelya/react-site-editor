import type { ComponentChildren, ComponentProp } from '@react-site-editor/types';

export interface TestProps {
    a: string;
    onClick: () => void;
    children?: ComponentChildren;
}
