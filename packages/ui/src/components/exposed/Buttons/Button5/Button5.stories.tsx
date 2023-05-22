import type { Meta, StoryObj } from '@storybook/react';
import { specsValuesParser } from '@react-site-editor/functions';
import { argTypesControlsParser } from '@/utils';
import Button5, { propsSpecs } from './Button5.component';
import type { Button5Props } from './Button5.types';

const meta = {
    title: 'Buttons/Button5',
    argTypes: argTypesControlsParser<Button5Props>(propsSpecs),
    component: Button5
} satisfies Meta<typeof Button5>;

type Button5Story = StoryObj<typeof Button5>;

export const Default = {
    args: specsValuesParser<Button5Props>(propsSpecs)
} satisfies Button5Story;

export default meta;
