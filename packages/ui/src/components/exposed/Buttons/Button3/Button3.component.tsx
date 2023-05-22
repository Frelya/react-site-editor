import { specsValuesParser } from '@react-site-editor/functions';
import type { ComponentPropsSpecs } from '@react-site-editor/types';
import type { Button3Props } from './Button3.types';
import styles from './Button3.module.css';

const Button3: React.FunctionComponent<Button3Props> = (props) => {
    const fontSize = `font${props.fontSize}` as keyof typeof styles;

    return (
        <button className={`${styles.baseButton} ${styles[fontSize]}`} onClick={props?.onClick}>
            {props.text}
        </button>
    );
};

export const propsSpecs: ComponentPropsSpecs<Button3Props> = {
    text: {
        value: 'Button3',
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
        value: () => console.log('Button3 clicked'),
        control: {
            type: 'callback'
        }
    },
    iconName: 'ui-eject'
};

Button3.defaultProps = specsValuesParser<Button3Props>(propsSpecs);

export default Button3;
