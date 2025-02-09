import SpeciesList from './species-list.tsx';
import SearchForm from './search-form.tsx';
import { useEffect, useState } from 'react';
import useFetchSpecies from '../hooks/use-fetch-species.ts';

function SpeciesLookup() {
  const savedSpecieName = localStorage.getItem('specieName') || '';
  const [specieName, setSpecieName] = useState(savedSpecieName);
  const { speciesList, loadingState } = useFetchSpecies(specieName);

  useEffect(() => {
    localStorage.setItem('specieName', specieName);
  }, [specieName]);

  return (
    <>
      <SearchForm setSpecieName={setSpecieName} defaultValue={specieName} />
      <SpeciesList speciesList={speciesList} loadingState={loadingState} />
    </>
  );
}

export default SpeciesLookup;
