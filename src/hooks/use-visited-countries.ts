import { useCallback, useState } from 'react';

import {
  getVisitedCountries,
  setVisitedCountries,
} from '../utils/local-storage';

export const useVisitedCountries = () => {
  const [visitedCountries, setVisited] = useState<string[]>(
    getVisitedCountries()
  );

  const toggleCountry = useCallback(
    (countryCode: string) => {
      const updated = visitedCountries.includes(countryCode)
        ? visitedCountries.filter((code) => code !== countryCode)
        : [...visitedCountries, countryCode];

      setVisited(updated);
      setVisitedCountries(updated);
    },
    [visitedCountries]
  );

  const isVisited = useCallback(
    (countryCode: string) => {
      return visitedCountries.includes(countryCode);
    },
    [visitedCountries]
  );

  return {
    visitedCountries,
    toggleCountry,
    isVisited,
  };
};
