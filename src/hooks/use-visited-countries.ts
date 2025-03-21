import { useState } from 'react';

import {
  getVisitedCountries,
  setVisitedCountries,
} from '../utils/local-storage';

export const useVisitedCountries = () => {
  const [visitedCountries, setVisited] = useState<string[]>(
    getVisitedCountries()
  );

  // TODO: Add useCallback later with visitedCountries dependency
  const toggleCountry = (countryCode: string) => {
    const updated = visitedCountries.includes(countryCode)
      ? visitedCountries.filter((code) => code !== countryCode)
      : [...visitedCountries, countryCode];

    setVisited(updated);
    setVisitedCountries(updated);
  };

  // TODO: Add useCallback later with visitedCountries dependency
  const isVisited = (countryCode: string) => {
    return visitedCountries.includes(countryCode);
  };

  return {
    visitedCountries,
    toggleCountry,
    isVisited,
  };
};
