import type { ComponentInfos } from '@react-site-editor/types';

export interface PreviewElement {
    index: number;
    data: PreviewElementData;
}

export interface PreviewElementData extends ComponentInfos {
    children?: Omit<PreviewElement, 'children'>[];
}

export interface UpdateElementData {
    id: number;
    propName: string;
    value: unknown;
}

export interface MoveElementData {
    currentIndex: number;
    newIndex: number;
}

export type PreviewTree = PreviewElementData[];
