import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import previewTreeReducer from './previewTree/previewTreeSlice';
import activeComponentReducer from './activeComponent/activeComponentSlice';

const store = configureStore({
    reducer: {
        previewTree: previewTreeReducer,
        activeComponent: activeComponentReducer
    }
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;
