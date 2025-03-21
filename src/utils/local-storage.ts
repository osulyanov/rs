const VISITED_COUNTRIES_KEY = 'visitedCountries';

export const getVisitedCountries = (): string[] => {
  const stored = localStorage.getItem(VISITED_COUNTRIES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const setVisitedCountries = (countryCodes: string[]): void => {
  localStorage.setItem(VISITED_COUNTRIES_KEY, JSON.stringify(countryCodes));
};

export const toggleVisitedCountry = (countryCode: string): string[] => {
  const visited = getVisitedCountries();
  const isVisited = visited.includes(countryCode);

  const updated = isVisited
    ? visited.filter((code) => code !== countryCode)
    : [...visited, countryCode];

  setVisitedCountries(updated);
  return updated;
};
