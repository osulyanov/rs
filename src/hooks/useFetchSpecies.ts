import { useEffect, useState } from 'react';
import fetchSpeciesList, { SpeciesResult } from '../utils/fetchSpeciesList.tsx';

const useFetchSpecies = (specieName: string) => {
  const [speciesList, setSpeciesList] = useState<SpeciesResult[] | null>(null);
  const [loadingState, setLoadingState] = useState('idle');

  useEffect(() => {
    triggerSearch(specieName);
  }, [specieName]);

  const triggerSearch = (specieName: string) => {
    setSpeciesList(null);
    setLoadingState('loading');
    fetchSpeciesList(specieName)
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

  return { speciesList, loadingState };
};

export default useFetchSpecies;
