import { ComponentProp } from '@react-site-editor/types';

export interface ColumnLayoutProps {
    columnCount: ComponentProp;
    layout: ComponentProp;
}

export enum ColumnLayoutOptions {
    DEFAULT = 'default'
}
