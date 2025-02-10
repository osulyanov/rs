import SpeciesList from '../components/species-list.tsx';
import SearchForm from '../components/search-form.tsx';
import { useEffect, useState } from 'react';
import useFetchSpecies from '../hooks/use-fetch-species.ts';
import { Outlet, useNavigate, useSearchParams } from 'react-router';

function SpeciesLookup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1');
  const savedSpecieName = localStorage.getItem('specieName');
  const [specieName, setSpecieName] = useState(savedSpecieName || '');
  const { speciesList, loadingState } = useFetchSpecies({ specieName, page });

  const handleSearch = (specieName: string) => {
    setSpecieName(specieName);
  };

  useEffect(() => {
    localStorage.setItem('specieName', specieName);
    navigate(`/?page=1&term=${specieName}`);
  }, [specieName]);

  return (
    <>
      <SearchForm setSpecieName={handleSearch} defaultValue={specieName} />
      <SpeciesList speciesList={speciesList} loadingState={loadingState} />
      <Outlet />
    </>
  );
}

export default SpeciesLookup;
