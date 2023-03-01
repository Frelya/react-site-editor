import './main.css';
import type { ComponentInfos } from '@react-site-editor/types';

async function getAllComponents(): Promise<ComponentInfos[]> {
    const components: ComponentInfos[] = [];
    const files = import.meta.glob(`./components/**/*.tsx`);

    for (const filepath in files) {
        const filename = filepath.match(/.*\/(.+)\.tsx$/)?.[1];

        if (filename) {
            const component = await import(filepath /* @vite-ignore */);
            components.push({
                name: filename,
                defaultProps: component.defaultProps
            });
        }
    }

    return components;
}

export const components = await getAllComponents();
