import type { PreviewElement, PreviewTree, UpdateElementData } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreviewTreeState {
    value: PreviewTree;
}
const initialState: PreviewTreeState = {
    value: []
};
export const previewTreeSlice = createSlice({
    name: 'previewTree',
    initialState,
    reducers: {
        addComponent: (state, actions: PayloadAction<PreviewElement>) => {
            state.value.splice(actions.payload.index, 0, actions.payload.data);
        },
        updateComponent: (state, actions: PayloadAction<UpdateElementData>) => {
            const { id, propName, value } = actions.payload;
            const shallow = state.value.find((el, i) => i == id);
            if (shallow) {
                shallow.props[propName].value = value;
                state.value[id] = { ...shallow };
            }
        },
        addChildren: () => {
            return;
        },
        arrange: () => {
            return;
        },
        deleteComponent: (state, actions: PayloadAction<{ index: number }>) => {
            state.value.splice(actions.payload.index, 1);
        },
        deleteChildren: () => {
            return;
        },
        resetTree: (state) => {
            if (state.value.length === 0) {
                return;
            }

            if (
                confirm(
                    'Are you sure you want to discard all changes ?\n' +
                        'This action cannot be undone.'
                )
            ) {
                state.value = [];
            }
        }
    }
});

export const {
    addComponent,
    updateComponent,
    addChildren,
    arrange,
    deleteComponent,
    deleteChildren,
    resetTree
} = previewTreeSlice.actions;

export default previewTreeSlice.reducer;
export const selectPreviewTree = (state: { previewTree: { value: PreviewTree } }) =>
    state.previewTree.value;
