import { configureStore, ThunkAction, Actions } from '@reduxjs/toolkit';
import previewTreeReducer from './previewTree/previewTreeSlice';
import activeComponentReducer from './activeComponent/activeComponentSlice';

const store = configureStore({
    reducer: {
        previewTree: previewTreeReducer,
        activeComponent: activeComponentReducer
    }
});

export type AppDispatch = typeof store.dispatch;

// F**king typescript (╯°□°）╯︵ ┻━┻
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type RootState = ReturnType<typeof store.getState>;

export default store;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Actions<string>
>;
