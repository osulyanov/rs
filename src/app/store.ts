import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { swApi } from '../services/sw-api';

export const store = configureStore({
  reducer: {
    [swApi.reducerPath]: swApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(swApi.middleware);
  },
});

// required for refetchOnFocus/refetchOnReconnect behaviors
// probably not needed
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
