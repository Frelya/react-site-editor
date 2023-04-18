import type { PredefinedComponentProps } from '@react-site-editor/types';
import { PropsEnum } from '@react-site-editor/types';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.css';

const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const textColor = props.textColor?.value as string;
    const fontSize = `font${props.fontSize?.value}` as keyof typeof styles;
    const backgroundColor = props.backgroundColor?.value as string;

    return (
        <button
            className={`${styles.baseButton} ${styles[fontSize]}`}
            style={{
                backgroundColor: backgroundColor,
                color: textColor
            }}
            onClick={props?.onClick}>
            {props.text?.value}
            {props.children}
        </button>
    );
};

export const defaultProps: PredefinedComponentProps<ButtonProps> = {
    text: { type: PropsEnum.TEXT, value: 'Button' },
    textColor: { type: PropsEnum.COLOR, value: '#ffffff' },
    fontSize: { type: PropsEnum.SIZE, value: '1' },
    backgroundColor: { type: PropsEnum.COLOR, value: '#3b82f6' },
    onClick: () => console.log('Button clicked'),
    maxChildren: 2,
    iconName: 'ui-button-play'
};

Button.defaultProps = defaultProps;

export default Button;
