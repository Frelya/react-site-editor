import type { PredefinedComponentProps } from '@react-site-editor/types';
import ColumnLayoutStyle from './ColumnLayout.module.css';

interface ColumnLayoutProps {
    layout: ColumnLayoutOptions;
}

enum ColumnLayoutOptions {
    DEFAULT = 'default'
}

const ColumnLayout: React.FunctionComponent<ColumnLayoutProps> = (props) => {
    const map = {
        default: 3
    };

    const ListItem = () => {
        const itemsList = [];
        for (let i = 0; i < map[ColumnLayoutOptions.DEFAULT]; i++) {
            itemsList.push(
                <div key={i} className={ColumnLayoutStyle.boxElement}>
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
        <div className={ColumnLayoutStyle.style}>
            <ListItem />
        </div>
    );
};

export const defaultProps: PredefinedComponentProps<ColumnLayoutProps> = {
    layout: ColumnLayoutOptions.DEFAULT,
    iconName: 'ui-table-columns'
};

export default ColumnLayout;
