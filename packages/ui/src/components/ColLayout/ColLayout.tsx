import type { Component, ComponentProp } from '@react-site-editor/types';
import ColLayoutStyle from './ColLayout.module.css';

interface ColLayoutProps {
    layout: ColLayoutOptions;
}

enum ColLayoutOptions {
    DEFAULT = 'default'
}

const defaultColLayoutProps: ColLayoutProps = {
    layout: ColLayoutOptions.DEFAULT
};

const ColLayout: React.FunctionComponent<ColLayoutProps> = () => {
    return <div className={ColLayoutStyle.style}></div>;
};

const ColLayoutComponent: Component<ColLayoutProps> = {
    id: 'C/ColLayout',
    caller: ColLayout,
    defaultProps: defaultColLayoutProps
};

export default ColLayoutComponent;
