import type { ComponentInfos } from '@react-site-editor/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ActiveComponentState {
    value: ComponentInfos;
}

const initialState: ActiveComponentState = {
    value: {} as ComponentInfos
};

export const activeComponentSlice = createSlice({
    name: 'activeComponent',
    initialState,
    reducers: {
        updateActiveComponent: (state, actions: PayloadAction<ComponentInfos>) => {
            state.value = actions.payload;
        },
        resetActiveComponent: (state) => {
            state.value = {} as ComponentInfos;
        }
    }
});

export const { updateActiveComponent, resetActiveComponent } = activeComponentSlice.actions;

export const selectActiveComponent = (state: { activeComponent: { value: ComponentInfos } }) =>
    state.activeComponent.value;

export default activeComponentSlice.reducer;
