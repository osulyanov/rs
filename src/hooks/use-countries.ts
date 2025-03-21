import { useState, useEffect } from 'react';
import { Country, FilterConfig, SortConfig } from '../types/country';
import { fetchCountries } from '../services/countries-api';

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [filters, setFilters] = useState<FilterConfig>({});
  const [sort, setSort] = useState<SortConfig>({
    field: 'name',
    direction: 'asc',
  });

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch countries'
        );
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  useEffect(() => {
    let result = [...countries];

    if (filters.name) {
      result = result.filter((country) =>
        country.name.toLowerCase().includes(filters.name?.toLowerCase() ?? '')
      );
    }
    if (filters.region) {
      result = result.filter(
        (country) =>
          country.region.toLowerCase() === filters.region?.toLowerCase()
      );
    }

    result.sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sort.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sort.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    setFilteredCountries(result);
  }, [countries, filters, sort]);

  return {
    countries: filteredCountries,
    loading,
    error,
    setFilters,
    setSort,
    filters,
    sort,
  };
};
