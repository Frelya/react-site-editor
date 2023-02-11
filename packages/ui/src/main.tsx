import './main.css';
import type { Component } from '@react-site-editor/types';

type ComponentsMap = Record<string, Component<any>>;

async function getAllComponents() {
    const files = import.meta.glob('./components/**/*.tsx');
    const components: ComponentsMap = {};

    for (const filepath in files) {
        const filename = filepath.match(/.*\/(.+)\.tsx$/)?.[1];

        if (filename) {
            const component = await import(filepath/* @vite-ignore */);
            components[filename] = component.default;
        }
    }
    return components as ComponentsMap;
}

export const components = await getAllComponents();
