import { PreviewElement, PreviewTree } from '@/libs/types/tree.type';
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

export const { addComponent, addChildren, arrange, deleteComponent, deleteChildren, resetTree } =
    previewTreeSlice.actions;

export default previewTreeSlice.reducer;
export const selectPreviewTree = (state: { previewTree: { value: PreviewTree } }) =>
    state.previewTree.value;
