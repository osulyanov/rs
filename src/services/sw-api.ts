import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type SpeciesListResult = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SpeciesResult[];
};

export type SpeciesResult = {
  url: string;
  name: string;
  classification: string;
  designation: string;
  average_height?: string;
};

export interface SpecieResult {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  language: string;
  [key: string]: string;
}

export const swApi = createApi({
  reducerPath: 'swapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getSpeciesList: builder.query<
      SpeciesListResult,
      { specieName: string; page: number }
    >({
      query: ({ specieName, page }) =>
        `species/?search=${specieName}&page=${page}`,
    }),
    getSpecie: builder.query<SpecieResult, string>({
      query: (specieId) => `species/${specieId}/`,
    }),
  }),
});

export const { useGetSpeciesListQuery, useGetSpecieQuery } = swApi;
