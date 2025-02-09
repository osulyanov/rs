export type SpeciesResult = {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
};

const fetchSpeciesList = async (
  specieName: string
): Promise<SpeciesResult[]> => {
  const response = await fetch(
    'https://swapi.dev/api/species/?search=' + specieName
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.results;
};

export default fetchSpeciesList;
