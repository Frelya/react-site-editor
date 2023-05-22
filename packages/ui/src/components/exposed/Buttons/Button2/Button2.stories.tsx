import type { Meta, StoryObj } from '@storybook/react';
import { specsValuesParser } from '@react-site-editor/functions';
import { argTypesControlsParser } from '@/utils';
import Button2, { propsSpecs } from './Button2.component';
import type { Button2Props } from './Button2.types';

const meta = {
    title: 'Buttons/Button2',
    argTypes: argTypesControlsParser<Button2Props>(propsSpecs),
    component: Button2
} satisfies Meta<typeof Button2>;

type ButtonStory = StoryObj<typeof Button2>;

export const Default = {
    // Get the default props from the specs
    args: specsValuesParser<Button2Props>(propsSpecs)
} satisfies ButtonStory;

export default meta;
