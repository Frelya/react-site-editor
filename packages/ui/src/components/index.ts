import type { ComponentInfos } from '@react-site-editor/types';
import * as allComponent from '../index';

async function getAllComponents(): Promise<ComponentInfos[]> {
    const components: ComponentInfos[] = [];
    const files = import.meta.glob(`./exposed/**/*.tsx`);

    for (const filepath in files) {
        const filename = filepath.match(/.*\/(.+)\.tsx$/)?.[1];
        const directory = filepath.match(/\/(\w+)\/\w+\/\w+\.tsx$/)?.[1];

        if (filename) {
            components.push({
                name: filename,
                group: directory || 'none',
                defaultProps: (allComponent as Record<string, any>)[
                    `${filename.charAt(0).toLowerCase() + filename.slice(1)}DefaultProps`
                ]
            });
        }
    }

    return components;
}

export const components = await getAllComponents();
