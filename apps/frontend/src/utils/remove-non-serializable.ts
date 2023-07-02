import type { ComponentInfos } from '@react-site-editor/types';

export function removeNonSerializable(specs: ComponentInfos['specs']): ComponentInfos['specs'] {
    const { onClick, ...rest } = specs;
    return rest;
}
