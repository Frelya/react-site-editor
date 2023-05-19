import '../src/main.css';
import type { Preview } from '@storybook/react';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        options: {
            storySort: {
                method: 'alphabetical',
                locales: 'en-US'
            }
        },
        layout: 'centered',
        docs: {
            source: {
                language: 'tsx',
                dark: true
            }
        },
        loaders: [
            // TODO: Add loaders to help waiting
        ]
    }
};

export default preview;
