import { createSlice } from '@reduxjs/toolkit';

export interface CountriesState {
  countries: string[];
}

const initialState: CountriesState = {
  countries: ['Russia', 'USA', 'China', 'Germany', 'France'],
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const selectCountries = (state: { countries: CountriesState }) =>
  state.countries.countries;

export default countriesSlice.reducer;
