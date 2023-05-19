import type { Meta, StoryObj } from '@storybook/react';
import Button2, { defaultProps } from './Button2.component';

const meta = {
    title: 'Buttons/Button2',
    component: Button2
} satisfies Meta<typeof Button2>;

type Button2Story = StoryObj<typeof Button2>;

export const Default = {
    args: defaultProps
} satisfies Button2Story;

export default meta;
