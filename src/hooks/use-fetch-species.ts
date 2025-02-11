import { useEffect, useState } from 'react';
import fetchSpeciesList, {
  SpeciesListResult,
} from '../utils/fetch-species-list';

interface useFetchSpeciesProps {
  specieName: string;
  page: number;
}

const useFetchSpecies = ({ specieName, page }: useFetchSpeciesProps) => {
  const [speciesList, setSpeciesList] = useState<SpeciesListResult | null>(
    null
  );
  const [loadingState, setLoadingState] = useState('idle');

  const triggerSearch = (specieName: string, page: number) => {
    setSpeciesList(null);
    setLoadingState('loading');
    fetchSpeciesList(specieName, page)
      .then((speciesList) => {
        setSpeciesList(speciesList);
        setLoadingState('idle');
      })
      .catch(() => {
        console.error(`Error fetching species`);
        setSpeciesList(null);
        setLoadingState('error');
      });
  };

  useEffect(() => {
    triggerSearch(specieName, page);
  }, [specieName, page]);

  return { speciesList, loadingState };
};

export default useFetchSpecies;
