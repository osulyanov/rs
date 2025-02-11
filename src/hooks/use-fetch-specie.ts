import { useEffect, useState } from 'react';
import fetchSpecie, { SpecieResult } from '../utils/fetch-specie';

const useFetchSpecie = (specieId: string) => {
  const [specie, setSpecie] = useState<SpecieResult | null>(null);
  const [loadingState, setLoadingState] = useState('idle');

  useEffect(() => {
    const url = `https://swapi.dev/api/species/${specieId}/`;
    fetch(url);
  }, [specieId]);

  const fetch = (url: string) => {
    setSpecie(null);
    setLoadingState('loading');
    fetchSpecie(url)
      .then((specie) => {
        setSpecie(specie);
        setLoadingState('idle');
      })
      .catch(() => {
        console.error(`Error fetching specie`);
        setSpecie(null);
        setLoadingState('error');
      });
  };

  return { specie, loadingState };
};

export default useFetchSpecie;
