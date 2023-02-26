import { createSlice } from '@reduxjs/toolkit';

export const previewTreeSlice = createSlice({
    name: 'previewTree',
    initialState: {
        value: ['ded']
    },
    reducers: {
        addComponent: (state) => {
            return state;
        },
        addChildren: (state) => {
            return;
        },
        arrange: (state) => {
            return;
        },
        deleteComponent: (state) => {
            return;
        }
    }
});

export const { addComponent, addChildren, arrange, deleteComponent } =
    previewTreeSlice.actions;

export default previewTreeSlice.reducer;
export const selectPreviewTree = (state) => state.previewTree.value;
