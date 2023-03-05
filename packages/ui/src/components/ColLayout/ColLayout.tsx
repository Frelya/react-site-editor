import type { PredefinedComponentProps } from '@react-site-editor/types';
import ColLayoutStyle from './ColLayout.module.css';

interface ColLayoutProps {
    layout: ColLayoutOptions;
}

enum ColLayoutOptions {
    DEFAULT = 'default'
}

const ColLayout: React.FunctionComponent<ColLayoutProps> = (props) => {
    const map = {
        default: 3
    };
    const ListItem = () => {
        const itemList = [];
        for (let i = 0; i < map[ColLayoutOptions.DEFAULT]; i++) {
            itemList.push(
                <div key={i} className={ColLayoutStyle.boxElement}>
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

        return <>{itemList}</>;
    };
    return (
        <div className={ColLayoutStyle.style}>
            <ListItem />
        </div>
    );
};

export const defaultProps: PredefinedComponentProps<ColLayoutProps> = {
    layout: ColLayoutOptions.DEFAULT
};

export default ColLayout;
