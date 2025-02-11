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

const fetchSpeciesList = async (
  specieName: string,
  page: number
): Promise<SpeciesListResult> => {
  const response = await fetch(
    'https://swapi.dev/api/species/?search=' + specieName + '&page=' + page
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export default fetchSpeciesList;
