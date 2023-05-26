import type { ComponentInfos, ExposedComponentsMap } from '@react-site-editor/types';
import * as allComponent from '../index';

async function getAllComponents(): Promise<ComponentInfos[]> {
    const components: ComponentInfos[] = [];
    const files = import.meta.glob(`./exposed/**/*.component.*`);

    for (const filepath in files) {
        const filename = filepath.match(/.*\/(.+)\.component\..+$/)?.[1];
        const directory = filepath.match(/\/(\w+)\/\w+\/\w+\.component\..+$/)?.[1];

        if (filename) {
            components.push({
                name: filename,
                group: directory || 'none',
                specs: (allComponent as ExposedComponentsMap)[
                    `${filename.charAt(0).toLowerCase() + filename.slice(1)}PropsSpecs`
                ]
            });
        }
    }

    return components;
}

export const components = await getAllComponents();
