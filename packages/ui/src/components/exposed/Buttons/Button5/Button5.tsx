import type { PredefinedComponentProps } from '@react-site-editor/types';
import { PropsEnum } from '@react-site-editor/types';
import styles from './Button5.module.css';
import { Button5Props } from './Button5.types';

const Button5: React.FC<Button5Props> = (props) => {
    // Contenu du composant
    return (
        <>
            <div className={styles.container}>Button5</div>
        </>
    );
};
export const defaultProps: PredefinedComponentProps<Button5Props> = {
    //Contenu des props par défaut
    onClick: () => {
        return;
    },
    iconName: 'ui-default'
};

export default Button5;
