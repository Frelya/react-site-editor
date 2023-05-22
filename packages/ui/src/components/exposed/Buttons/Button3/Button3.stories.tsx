import type { Meta, StoryObj } from '@storybook/react';
import { specsValuesParser } from '@react-site-editor/functions';
import { argTypesControlsParser } from '@/utils';
import Button3, { propsSpecs } from './Button3.component';
import type { Button3Props } from './Button3.types';

const meta = {
    title: 'Buttons/Button3',
    argTypes: argTypesControlsParser<Button3Props>(propsSpecs),
    component: Button3
} satisfies Meta<typeof Button3>;

type ButtonStory = StoryObj<typeof Button3>;

export const Default = {
    // Get the default props from the specs
    args: specsValuesParser<Button3Props>(propsSpecs)
} satisfies ButtonStory;

export default meta;
