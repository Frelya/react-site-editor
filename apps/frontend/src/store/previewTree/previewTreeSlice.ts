import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ItemInterface } from 'react-sortablejs';
import type {
    PreviewElement,
    PreviewTree,
    PreviewElementData,
    UpdateElementData,
    MoveElementData
} from '@/types';

export interface PreviewTreeState {
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
            const shallow = state.value.find(
                (element: PreviewElementData, index: number) => index == id
            );

            if (shallow) {
                shallow.specs[propName].value = value;
                state.value[id] = { ...shallow };
            }
        },
        addChildren: () => {
            return;
        },
        moveComponent: (state, actions: PayloadAction<MoveElementData>) => {
            const { currentIndex, newIndex } = actions.payload;

            if (currentIndex === newIndex || newIndex < 0 || newIndex >= state.value.length) {
                return;
            }

            const [removed] = state.value.splice(currentIndex, 1);
            state.value.splice(newIndex, 0, removed);
        },
        deleteComponent: (state, actions: PayloadAction<{ index: number }>) => {
            state.value.splice(actions.payload.index, 1);
        },
        deleteChildren: () => {
            return;
        },
        updateTree: (state, actions: PayloadAction<ItemInterface[]>) => {
            // The payload contains only the name of each element (index suffixed)
            state.value = actions.payload.map((element) => {
                const elementId = String(element.id).split('-')[1];
                // Prefers filter to avoid finding undefined value
                return state.value.filter(
                    (item: PreviewElementData, index: number) => String(index) == elementId
                )[0];
            });
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
    moveComponent,
    deleteComponent,
    deleteChildren,
    updateTree,
    resetTree
} = previewTreeSlice.actions;

export const selectPreviewTree = (state: { previewTree: { value: PreviewTree } }) =>
    state.previewTree.value;

const previewTreeReducer = previewTreeSlice.reducer;

export default previewTreeReducer;
