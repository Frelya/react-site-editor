import { Meta, StoryObj } from '@storybook/react';
import Button5, { defaultProps } from './Button5.component';

const meta = {
    title: 'Buttons/Button5',
    component: Button5
} satisfies Meta<typeof Button5>;

type Button5Story = StoryObj<typeof Button5>;

export const Default: Button5Story = {
    args: defaultProps
};

export default meta;
