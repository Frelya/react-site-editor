import './main.css';
import type { ComponentsMap, PredefinedComponent } from '@react-site-editor/types';

async function getAllComponents(): Promise<ComponentsMap<PredefinedComponent>> {
    const components: ComponentsMap<PredefinedComponent> = {};
    const files = import.meta.glob(`./components/**/*.tsx`);

    for (const filepath in files) {
        const filename = filepath.match(/.*\/(.+)\.tsx$/)?.[1];

        if (filename) {
            const component = await import(filepath /* @vite-ignore */);
            components[filename] = component.default;
        }
    }

    return components as ComponentsMap<PredefinedComponent>;
}

export const components = await getAllComponents();
