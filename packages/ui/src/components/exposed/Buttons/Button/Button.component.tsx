import { specsValuesParser } from '@react-site-editor/functions';
import type { ComponentPropsSpecs } from '@react-site-editor/types';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.css';

const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const textColor = props.textColor;
    const fontSize = `font${props.fontSize}` as keyof typeof styles;
    const backgroundColor = props.backgroundColor;

    const clickHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        props.onClick();
    };

    return (
        <button
            className={`${styles.baseButton} ${styles[fontSize]}`}
            style={{
                backgroundColor: backgroundColor,
                color: textColor
            }}
            onClick={clickHandler}>
            {props.text}
        </button>
    );
};

export const propsSpecs: ComponentPropsSpecs<ButtonProps> = {
    text: {
        value: 'Button',
        control: {
            type: 'text'
        }
    },
    textColor: {
        value: '#ffffff',
        control: {
            type: 'color'
        }
    },
    fontSize: {
        value: 1,
        control: {
            type: 'select',
            options: [1, 2, 3]
        }
    },
    backgroundColor: {
        value: '#3b82f6',
        control: {
            type: 'color'
        }
    },
    onClick: {
        value: () => console.log('Button clicked'),
        control: {
            type: 'callback'
        }
    },
    iconName: 'ui-button-play'
};

Button.defaultProps = specsValuesParser<ButtonProps>(propsSpecs);

export default Button;
