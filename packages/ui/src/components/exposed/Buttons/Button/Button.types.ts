import type { ComponentProp } from '@react-site-editor/types';

export interface ButtonProps {
    text: ComponentProp;
    textColor: ComponentProp;
    fontSize: ComponentProp;
    backgroundColor: ComponentProp;
    onClick: () => void;
    children?: React.ReactNode[];
}
