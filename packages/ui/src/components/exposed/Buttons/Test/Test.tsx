import type { PredefinedComponentProps } from '@react-site-editor/types';
import { PropsEnum } from '@react-site-editor/types';
import styles from './Test.module.css';
import { TestProps } from './Test.types';

const Test: React.FC<TestProps> = (props) => {
    // Contenu du composant
    return (
        <>
            <div className={styles.container}>Test</div>
        </>
    );
};
export const defaultProps: PredefinedComponentProps<TestProps> = {
    //Contenu des props par défaut
    a: 'ded',
    onClick: () => {
        return;
    },
    iconName: 'ui-default'
};
Test.defaultProps = defaultProps;

export default Test;
