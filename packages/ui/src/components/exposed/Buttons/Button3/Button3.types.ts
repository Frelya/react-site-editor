import type { ComponentProp } from '@react-site-editor/types';

export interface Button3Props {
    text: ComponentProp;
    fontSize: ComponentProp;
    onClick: () => void;
    children?: React.ReactNode[];
}
