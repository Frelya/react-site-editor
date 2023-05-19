import { Meta, StoryObj } from '@storybook/react';
import ColumnLayout, { defaultProps } from './ColumnLayout.component';

const meta = {
    title: 'Layouts/Column Layout',
    component: ColumnLayout
} satisfies Meta<typeof ColumnLayout>;

type ColumnLayoutStory = StoryObj<typeof ColumnLayout>;

export const Default: ColumnLayoutStory = {
    args: defaultProps
};

export default meta;
