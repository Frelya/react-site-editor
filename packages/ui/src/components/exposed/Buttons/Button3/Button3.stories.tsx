import type { Meta, StoryObj } from '@storybook/react';
import Button3, { defaultProps } from './Button3.component';

const meta = {
    title: 'Buttons/Button3',
    component: Button3
} satisfies Meta<typeof Button3>;

type Button3Story = StoryObj<typeof Button3>;

export const Default = {
    args: defaultProps
} satisfies Button3Story;

export default meta;
