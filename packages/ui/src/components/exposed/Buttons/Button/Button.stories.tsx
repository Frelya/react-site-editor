import type { Meta, StoryObj } from '@storybook/react';
import { specsValuesParser } from '@react-site-editor/functions';
import { argTypesControlsParser } from '@/utils';
import Button, { propsSpecs } from './Button.component';
import type { ButtonProps } from './Button.types';

const meta = {
    title: 'Buttons/Button',
    // Get the controls from the specs
    argTypes: argTypesControlsParser<ButtonProps>(propsSpecs),
    component: Button
} satisfies Meta<typeof Button>;

type ButtonStory = StoryObj<typeof Button>;

export const Default = {
    // Get the default props from the specs
    args: specsValuesParser<ButtonProps>(propsSpecs)
} satisfies ButtonStory;

export default meta;
