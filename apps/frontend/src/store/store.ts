import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import previewTreeReducer from './previewTree/previewTreeSlice';

export const store = configureStore({
    reducer: {
        previewTree: previewTreeReducer
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
