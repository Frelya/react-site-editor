import { specsValuesParser } from '@react-site-editor/functions';
import type { ComponentPropsSpecs } from '@react-site-editor/types';
import styles from './ColumnLayout.module.css';
import type { ColumnLayoutProps } from './ColumnLayout.types';
import { ColumnLayoutOptions } from './ColumnLayout.types';

const ColumnLayout: React.FunctionComponent<ColumnLayoutProps> = (props) => {
    const columnCount = props.columnCount;

    const layout = {
        gridTemplateColumns:
            props.layout === ColumnLayoutOptions.DEFAULT ? '1fr '.repeat(columnCount) : props.layout
    };

    const ListItem = () => {
        const itemsList = [];
        for (let i = 0; i < columnCount; i++) {
            itemsList.push(
                <div key={i} className={styles.boxElement}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                            fill="currentColor"
                            d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
                        />
                    </svg>
                </div>
            );
        }

        return <>{itemsList}</>;
    };

    return (
        <div className={`${styles.container} grid-cols-${columnCount}`} style={layout}>
            <ListItem />
        </div>
    );
};

export const propsSpecs: ComponentPropsSpecs<ColumnLayoutProps> = {
    columnCount: {
        value: 3,
        control: {
            type: 'number',
            min: 2,
            max: 12 // Max for Tailwind CSS (12 columns)
        }
    },
    layout: {
        value: ColumnLayoutOptions.DEFAULT,
        control: {
            type: 'grid-template',
            flowCountPropName: 'columnCount'
        }
    },
    iconName: 'ui-table-columns'
};

ColumnLayout.defaultProps = specsValuesParser<ColumnLayoutProps>(propsSpecs);

export default ColumnLayout;
