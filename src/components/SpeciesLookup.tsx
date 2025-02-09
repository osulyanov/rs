import SpeciesList from './SpeciesList.tsx';
import fetchSpeciesList, { SpeciesResult } from '../utils/fetchSpeciesList.tsx';
import SearchForm from './SearchForm.tsx';
import { useEffect, useState } from 'react';

function SpeciesLookup() {
  const savedSpecieName = localStorage.getItem('specieName') || '';
  const [specieName, setSpecieName] = useState(savedSpecieName);
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

  const handleSearchFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newSpecieName = formData.get('specieName') as string;
    setSpecieName(newSpecieName);
    localStorage.setItem('specieName', newSpecieName);
  };

  return (
    <>
      <SearchForm onSubmit={handleSearchFormSubmit} defaultValue={specieName} />
      <SpeciesList speciesList={speciesList} loadingState={loadingState} />
    </>
  );
}

export default SpeciesLookup;
