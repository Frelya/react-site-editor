import './main.css';
import type { ComponentInfos } from '@react-site-editor/types';

async function getAllComponents(): Promise<ComponentInfos[]> {
    const components: ComponentInfos[] = [];
    const files = import.meta.glob(`./components/exposed/**/*.tsx`);

    for (const filepath in files) {
        const filename = filepath.match(/.*\/(.+)\.tsx$/)?.[1];
        const directory = filepath.match(/\/(\w+)\/\w+\/\w+\.tsx$/)?.[1];

        if (filename) {
            const component = await import(filepath /* @vite-ignore */);
            components.push({
                name: filename,
                group: directory || 'none',
                defaultProps: component.defaultProps
            });
        }
    }

    return components;
}

export const components = await getAllComponents();
