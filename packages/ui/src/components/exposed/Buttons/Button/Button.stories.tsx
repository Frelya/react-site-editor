import type { Meta, StoryObj } from '@storybook/react';
import { argTypesParser } from '@libs/argTypesParser';
import { argsParser } from '@libs/argsParser';
import Button, { defaultProps } from './Button.component';
import type { ButtonProps } from './Button.types';

const meta = {
    title: 'Buttons/Button',
    argTypes: argTypesParser(defaultProps),
    component: Button
} satisfies Meta<typeof Button>;

type ButtonStory = StoryObj<typeof Button>;

export const Default = {
    args: argsParser<ButtonProps>(defaultProps)
} satisfies ButtonStory;

export default meta;
