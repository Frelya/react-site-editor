export interface PreviewElement {
    index: number;
    data: PreviewElementData;
}

export interface PreviewElementData {
    name: string;
    group: string;
    props: Record<string, any>;
    children?: Omit<PreviewElement, 'children'>[];
}

export interface UpdateElementData {
    id: number;
    propName: string;
    value: string;
}

export interface MoveElementData {
    currentIndex: number;
    newIndex: number;
}

export type PreviewTree = PreviewElementData[];
