export interface PreviewElement {
    index: number;
    data: PreviewElementData;
}
export interface PreviewElementData {
    id: string;
    props: Record<string, any>;
    children?: Omit<PreviewElement, 'children'>[];
}

export type PreviewTree = PreviewElementData[];
