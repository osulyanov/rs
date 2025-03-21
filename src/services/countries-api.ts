import { Country } from '../types/country';

const API_BASE_URL = 'https://restcountries.com/v3.1';

type CountryData = {
  name: { common: string };
  cca2: string;
  population: number;
  region: string;
  flag: string;
};

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    const data = await response.json();

    return data.map((country: CountryData) => ({
      name: country.name.common,
      code: country.cca2,
      population: country.population,
      region: country.region,
      flag: country.flag,
    }));
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};
