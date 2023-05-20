import type { ComponentProp } from '@react-site-editor/types';

export interface ButtonProps {
    text: ComponentProp<string>;
    textColor: ComponentProp<string>
    fontSize: ComponentProp<number>;
    backgroundColor: ComponentProp<string>;
    onClick: ComponentProp<() => void>;
}
