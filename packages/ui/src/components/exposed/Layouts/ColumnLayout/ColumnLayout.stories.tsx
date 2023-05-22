import type { Meta, StoryObj } from '@storybook/react';
import { specsValuesParser } from '@react-site-editor/functions';
import { argTypesControlsParser } from '@/utils';
import ColumnLayout, { propsSpecs } from './ColumnLayout.component';
import type { ColumnLayoutProps } from './ColumnLayout.types';

const meta = {
    title: 'Layouts/Column Layout',
    component: ColumnLayout,
    argTypes: argTypesControlsParser<ColumnLayoutProps>(propsSpecs),
    decorators: [
        // In order to get a stretched layout, we need to wrap the component in a div
        (StoryFn, storyContext) => (
            <div
                style={{
                    width: '750px',
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                {StoryFn(storyContext.args)}
            </div>
        )
    ]
} satisfies Meta<typeof ColumnLayout>;

type ColumnLayoutStory = StoryObj<typeof ColumnLayout>;

export const Default = {
    args: specsValuesParser<ColumnLayoutProps>(propsSpecs)
} satisfies ColumnLayoutStory;

export default meta;
