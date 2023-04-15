import { ActiveComponent } from '@/libs/types/activeComponent.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ActiveComponentState {
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
        resetActiveComponent: (state) => {
            state.value = {} as ActiveComponent;
        }
    }
});

export const { updateActiveComponent, resetActiveComponent } = activeComponentSlice.actions;

export const selectActiveComponent = (state: { activeComponent: { value: ActiveComponent } }) =>
    state.activeComponent.value;

export default activeComponentSlice.reducer;
