import type {
    ComponentChildren,
    ComponentProp,
    PredefinedComponentProps
} from '@react-site-editor/types';
import { PropsEnum } from '@react-site-editor/types';
import styles from './Button3.module.css';

interface Button3Props {
    text: ComponentProp;
    fontSize: ComponentProp;
    onClick: () => void;
    children?: ComponentChildren;
}

const Button3: React.FunctionComponent<Button3Props> = (props) => {
    const fontSize = `font${props.fontSize?.value}` as keyof typeof styles;

    return (
        <button className={`${styles.baseButton} ${styles[fontSize]}`} onClick={props?.onClick}>
            {props.text?.value}
            {props.children}
        </button>
    );
};

export const defaultProps: PredefinedComponentProps<Button3Props> = {
    text: { type: PropsEnum.TEXT, value: 'Button 3' },
    fontSize: { type: PropsEnum.SIZE, value: '2' },
    onClick: () => console.log('Button clicked'),
    maxChildren: 2,
    iconName: 'ui-eject'
};

export default Button3;
