import type { Meta, StoryObj } from '@storybook/react';
import ColumnLayout, { defaultProps } from './ColumnLayout.component';

const meta = {
    title: 'Layouts/Column Layout',
    component: ColumnLayout,
    // TODO: Set argTypes to enable controls in the Storybook UI (needs a project refactoring)
    // argTypes: argTypes as Partial<ArgTypes<PredefinedComponentProps<ColumnLayoutProps>>>,
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
    args: defaultProps
} satisfies ColumnLayoutStory;

export default meta;
