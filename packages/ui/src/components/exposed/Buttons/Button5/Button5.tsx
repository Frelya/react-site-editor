import type { PredefinedComponentProps } from '@react-site-editor/types';
import { PropsEnum } from '@react-site-editor/types';
import styles from './Button5.module.css';
import { Button5Props } from './Button5.types';

const Button5: React.FunctionComponent<Button5Props> = (props) => {
    // The component definitions
    return (
        <>
            <div className={styles.container}>Button5</div>
        </>
    );
};

export const defaultProps: PredefinedComponentProps<Button5Props> = {
    // The default props of the component
    myProp: { type: PropsEnum.TEXT, value: 'My text prop' },
    onClick: () => {
        return;
    },
    iconName: 'ui-default'
};

Button5.defaultProps = defaultProps;

export default Button5;
