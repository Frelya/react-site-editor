import { specsValuesParser } from '@react-site-editor/functions';
import type { ComponentPropsSpecs } from '@react-site-editor/types';
import type { Button5Props } from './Button5.types';
import styles from './Button5.module.css';

const Button5: React.FunctionComponent<Button5Props> = (props) => {
    // The component definitions
    return (
        <>
            <div className={styles.container}>{props.myProp}</div>
        </>
    );
};

export const propsSpecs: ComponentPropsSpecs<Button5Props> = {
    // The default props of the component
    myProp: {
        value: 'Hello World!',
        control: {
            type: 'text'
        }
    },
    iconName: 'ui-default'
};

Button5.defaultProps = specsValuesParser<Button5Props>(propsSpecs);

export default Button5;
