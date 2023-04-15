import { ComponentInfos } from '@react-site-editor/types';

export interface ActiveComponent extends Omit<ComponentInfos, 'group' | 'defaultProps'> {
    index: number;
    props: ComponentInfos['defaultProps'];
}
