import type { PredefinedComponentProps } from '@react-site-editor/types';
import { PropsEnum } from '@react-site-editor/types';
import styles from './Button2.module.css';
import { Button2Props } from './Button2.types';

const Button2: React.FunctionComponent<Button2Props> = (props) => {
    const fontSize = `font${props.fontSize?.value}` as keyof typeof styles;

    return (
        <button className={`${styles.baseButton} ${styles[fontSize]}`} onClick={props?.onClick}>
            {props.text?.value}
            {props.children}
        </button>
    );
};

export const defaultProps: PredefinedComponentProps<Button2Props> = {
    text: { type: PropsEnum.TEXT, value: 'Button 2' },
    fontSize: { type: PropsEnum.SIZE, value: '2' },
    onClick: () => console.log('Button clicked'),
    maxChildren: 2,
    iconName: 'ui-toggle-off'
};

export default Button2;
