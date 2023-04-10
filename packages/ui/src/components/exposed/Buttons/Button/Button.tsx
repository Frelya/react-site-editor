import type {
    ComponentChildren,
    ComponentProp,
    PredefinedComponentProps
} from '@react-site-editor/types';
import { PropsEnum } from '@react-site-editor/types';
import styles from './Button.module.css';

interface ButtonProps {
    text: ComponentProp;
    fontSize: ComponentProp;
    onClick: () => void;
    children?: ComponentChildren;
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const fontSize = `font${props.fontSize?.value}` as keyof typeof styles;

    return (
        <button className={`${styles.baseButton} ${styles[fontSize]}`} onClick={props?.onClick}>
            {props.text?.value}
            {props.children}
        </button>
    );
};

export const defaultProps: PredefinedComponentProps<ButtonProps> = {
    text: { type: PropsEnum.TEXT, value: 'Button' },
    fontSize: { type: PropsEnum.SIZE, value: '1' },
    onClick: () => console.log('Button clicked'),
    maxChildren: 2,
    iconName: 'ui-button-play'
};

export default Button;
