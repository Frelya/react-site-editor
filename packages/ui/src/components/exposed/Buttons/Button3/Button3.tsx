import { PredefinedComponentProps, PropsEnum } from '@react-site-editor/types';
import styles from './Button3.module.css';
import { Button3Props } from './Button3.types';

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
Button3.defaultProps = defaultProps;

Button3.defaultProps = defaultProps;

export default Button3;
