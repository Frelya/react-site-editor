import { specsValuesParser } from '@react-site-editor/functions';
import type { ComponentPropsSpecs } from '@react-site-editor/types';
import type { Button2Props } from './Button2.types';
import styles from './Button2.module.css';

const Button2: React.FunctionComponent<Button2Props> = (props) => {
    const fontSize = `font${props.fontSize}` as keyof typeof styles;

    return (
        <button className={`${styles.baseButton} ${styles[fontSize]}`} onClick={props?.onClick}>
            {props.text}
        </button>
    );
};

export const propsSpecs: ComponentPropsSpecs<Button2Props> = {
    text: {
        value: 'Button2',
        control: {
            type: 'text'
        }
    },
    fontSize: {
        value: 1,
        control: {
            type: 'select',
            options: [1, 2, 3]
        }
    },
    onClick: {
        value: () => console.log('Button2 clicked'),
        control: {
            type: 'callback'
        }
    },
    iconName: 'ui-toggle-off'
};

Button2.defaultProps = specsValuesParser<Button2Props>(propsSpecs);

export default Button2;
