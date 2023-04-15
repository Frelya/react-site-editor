import type { PredefinedComponentProps } from '@react-site-editor/types';
import { PropsEnum } from '@react-site-editor/types';
import styles from './Button.module.css';
import { ButtonProps } from './Button.types';

const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const fontSize = `font${props.fontSize?.value}` as keyof typeof styles;

    return (
        <button className={`${styles.baseButton} ${styles[fontSize]}`} onClick={props?.onClick}>
            {JSON.stringify(props)}
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

Button.defaultProps = defaultProps;

export default Button;
