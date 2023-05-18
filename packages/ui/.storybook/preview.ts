import '../src/main.css';
import type { Preview } from '@storybook/react';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        layout: 'centered',
        docs: {
            source: {
                language: 'tsx',
                dark: true
            }
        },
        controls: {
        }
    }
};

export default preview;
