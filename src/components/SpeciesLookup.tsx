import SpeciesList from './SpeciesList.tsx';
import SearchForm from './SearchForm.tsx';
import { useEffect, useState } from 'react';
import useFetchSpecies from '../hooks/useFetchSpecies.ts';

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
