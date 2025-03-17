import { configureStore } from '@reduxjs/toolkit';
import submissionsReducer from '../slices/submissions-slice';
import countriesReducer from '../slices/countries-slice';

export const store = configureStore({
  reducer: {
    submissions: submissionsReducer,
    countries: countriesReducer,
  },
});
