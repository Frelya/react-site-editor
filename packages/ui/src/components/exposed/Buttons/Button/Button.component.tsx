import { argsParser } from '@libs/argsParser';
import type { PredefinedComponentProps } from '@react-site-editor/types';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.css';

const Button: React.FunctionComponent<PredefinedComponentProps<ButtonProps>> = (props) => {
    const args = argsParser<ButtonProps>(props);
    const textColor = args.textColor;
    const fontSize = `font${args.fontSize}` as keyof typeof styles;
    const backgroundColor = args.backgroundColor;

    return (
        <button
            className={`${styles.baseButton} ${styles[fontSize]}`}
            style={{
                backgroundColor: backgroundColor,
                color: textColor
            }}
            onClick={args.onClick}>
            {args.text}
        </button>
    );
};

export const defaultProps: PredefinedComponentProps<ButtonProps> = {
    text: {
        value: 'Button',
        control: {
            type: 'text',
        }
    },
    textColor: {
        value: '#ffffff',
        control: {
            type: 'color',
        }
    },
    fontSize: {
        value: 1,
        control: {
            type: 'select',
            options: [ 1, 2, 3 ]
        }
    },
    backgroundColor: {
        value: '#3b82f6',
        control: {
            type: 'color',
        }
    },
    onClick: {
        value: () => console.log('Button clicked'),
        control: {
            type: 'callback',
        }
    },
    maxChildren: 2,
    iconName: 'ui-button-play'
};

Button.defaultProps = defaultProps;

export default Button;
