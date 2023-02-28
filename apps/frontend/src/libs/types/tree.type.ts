import type { PredefinedComponentProps } from '@react-site-editor/types';

export interface PreviewElement {
    id: string;
    props: PredefinedComponentProps;
    children: Omit<PreviewElement, 'children'>[];
}

export type PreviewTree = PreviewElement[];
