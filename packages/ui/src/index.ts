import './main.css';
import type { ComponentInfos } from '@react-site-editor/types';
import * as allComponent from './main';

async function getAllComponents(): Promise<ComponentInfos[]> {
    const components: ComponentInfos[] = [];
    const files = import.meta.glob(`./components/exposed/**/*.tsx`);

    for (const filepath in files) {
        const filename = filepath.match(/.*\/(.+)\.tsx$/)?.[1];
        const directory = filepath.match(/\/(\w+)\/\w+\/\w+\.tsx$/)?.[1];

        if (filename) {
            components.push({
                name: filename,
                group: directory || 'none',
                defaultProps: (allComponent as Record<string, any>)[`defaultProps${filename}`]
            });
        }
    }

    return components;
}

export const components = await getAllComponents();
export * from './main';
