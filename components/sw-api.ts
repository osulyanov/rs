import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type SpeciesListResult = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SpeciesResult[];
};

export type SpeciesResult = {
  id: string;
  url: string;
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  language: string;
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

const extractIdFromUrl = (url: string): string => {
  return url.split('/').slice(-2)[0];
};
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
      transformResponse: (response: SpeciesListResult) => {
        return {
          ...response,
          results: response.results.map((specie) => ({
            ...specie,
            id: extractIdFromUrl(specie.url),
          })),
        };
      },
    }),
    getSpecie: builder.query<SpecieResult, string>({
      query: (specieId) => `species/${specieId}/`,
    }),
  }),
});

export const { useGetSpeciesListQuery, useGetSpecieQuery } = swApi;
