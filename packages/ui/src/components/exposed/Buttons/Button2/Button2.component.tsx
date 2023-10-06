import { specsValuesParser } from '@react-site-editor/functions';
import type { ComponentPropsSpecs } from '@react-site-editor/types';
import type { Button2Props } from './Button2.types';
import styles from './Button2.module.css';

const Button2: React.FunctionComponent<Button2Props> = (props) => {
    const fontSize = `font${props.fontSize}` as keyof typeof styles;

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        console.log('Button 2 clicked');
    };

    return (
        <button className={`${styles.baseButton} ${styles[fontSize]}`} onClick={handleClick}>
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
    iconName: 'ui-toggle-off'
};

Button2.defaultProps = specsValuesParser<Button2Props>(propsSpecs);

export default Button2;
