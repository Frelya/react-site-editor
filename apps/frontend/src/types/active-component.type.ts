import type { PreviewElementData } from './tree.type';

export interface ActiveComponent extends Pick<PreviewElementData, 'name' | 'specs'> {
    index: number;
}
