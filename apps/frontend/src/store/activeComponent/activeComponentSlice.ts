import type { ActiveComponent } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ActiveComponentState {
    value: ActiveComponent;
}

const initialState: ActiveComponentState = {
    value: {} as ActiveComponent
};

export const activeComponentSlice = createSlice({
    name: 'activeComponent',
    initialState,
    reducers: {
        updateActiveComponent: (state, actions: PayloadAction<ActiveComponent>) => {
            state.value = actions.payload;
        },
        updateActiveComponentProps: (state, actions: PayloadAction<ActiveComponent['props']>) => {
            state.value.props = actions.payload;
        },
        resetActiveComponent: (state) => {
            state.value = {} as ActiveComponent;
        }
    }
});

export const { updateActiveComponent, updateActiveComponentProps, resetActiveComponent } =
    activeComponentSlice.actions;

export const selectActiveComponent = (state: { activeComponent: { value: ActiveComponent } }) =>
    state.activeComponent.value;

const activeComponentReducer = activeComponentSlice.reducer;

export default activeComponentReducer;
