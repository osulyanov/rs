import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { swApi } from '@components/sw-api';
import { speciesSlice } from '@components/species-slice';

export const store = configureStore({
  reducer: {
    species: speciesSlice.reducer,
    [swApi.reducerPath]: swApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(swApi.middleware);
  },
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
