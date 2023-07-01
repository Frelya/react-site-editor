import type { PreviewElementData } from './tree.type';

export interface ActiveComponent extends Omit<PreviewElementData, 'group' | 'children'> {
    index: number;
}
