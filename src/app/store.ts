import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { swApi } from '../services/sw-api';
import { speciesSlice } from '../features/species/species-slice';

export const store = configureStore({
  reducer: {
    species: speciesSlice.reducer,
    [swApi.reducerPath]: swApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(swApi.middleware);
  },
});

// required for refetchOnFocus/refetchOnReconnect behaviors
// probably not needed here, but good to have in case we add more endpoints
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
