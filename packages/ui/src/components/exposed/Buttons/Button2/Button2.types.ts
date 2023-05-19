import type { ComponentProp } from '@react-site-editor/types';

export interface Button2Props {
    text: ComponentProp;
    fontSize: ComponentProp;
    onClick: () => void;
    children?: React.ReactNode[];
}
