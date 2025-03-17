import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CountriesState {
  countries: string[];
}

const initialState: CountriesState = {
  countries: ['Russia', 'USA', 'China', 'Germany', 'France'],
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    addCountry: (state, action: PayloadAction<string>) => {
      state.countries.push(action.payload);
    },
  },
});

export const selectCountries = (state: { countries: CountriesState }) =>
  state.countries.countries;
export const { addCountry } = countriesSlice.actions;

export default countriesSlice.reducer;
