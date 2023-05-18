import { Meta, StoryObj } from '@storybook/react';
import Button, { defaultProps } from './Button.component';

const meta = {
    title: 'Buttons/Button',
    component: Button
} satisfies Meta<typeof Button>;

type ButtonStory = StoryObj<typeof Button>;

export const Default: ButtonStory = {
    args: defaultProps
};

export default meta;
