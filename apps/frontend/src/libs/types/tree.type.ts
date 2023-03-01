export interface PreviewElement {
    id: string;
    props: Record<string, any>;
    children?: Omit<PreviewElement, 'children'>[];
}

export type PreviewTree = PreviewElement[];
