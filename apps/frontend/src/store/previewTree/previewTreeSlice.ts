import { TreeElement } from '@react-site-editor/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreviewTreeState {
    value: TreeElement[];
}
const initialState: PreviewTreeState = {
    value: []
};
export const previewTreeSlice = createSlice({
    name: 'previewTree',
    initialState,
    reducers: {
        addComponent: (state, actions: PayloadAction<TreeElement>) => {
            state.value.push(actions.payload);
        },
        addChildren: () => {
            return;
        },
        arrange: () => {
            return;
        },
        deleteComponent: () => {
            return;
        },
        deleteChildren: () => {
            return;
        },
        resetTree: () => {
            return;
        }
    }
});

export const {
    addComponent,
    addChildren,
    arrange,
    deleteComponent,
    deleteChildren,
    resetTree
} = previewTreeSlice.actions;

export default previewTreeSlice.reducer;
export const selectPreviewTree = (state) => state.previewTree.value;
