import type { StorybookConfig } from '@storybook/react-vite';
import * as process from 'process';

const storiesFilesPath = (): string => {
    const flagIndex = process.argv.indexOf('--component');
    const flagReturn = flagIndex !== -1 && process.argv[flagIndex + 1];

    return flagReturn
        ? `**/*/${process.argv[flagIndex + 1]}.stories.tsx`
        : '**/*/*.stories.tsx';
}

const config: StorybookConfig = {
    stories: [{
        titlePrefix: 'UI Components',
        directory: '../src/components/exposed',
        files: storiesFilesPath()
    }],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {
            strictMode: true
        }
    },
    docs: {
        autodocs: true,
        defaultName: 'Documentation'
    },
    core: {
        disableTelemetry: true,
        builder: '@storybook/builder-vite'
    }
};

export default config;
