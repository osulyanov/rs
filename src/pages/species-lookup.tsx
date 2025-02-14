import SpeciesList from '../components/species-list';
import SearchForm from '../components/search-form';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useGetSpeciesListQuery } from '../services/sw-api';

function SpeciesLookup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1');
  const savedSpecieName = localStorage.getItem('specieName');
  const [specieName, setSpecieName] = useState(savedSpecieName || '');
  const {
    data: speciesList,
    error,
    isLoading,
  } = useGetSpeciesListQuery({ specieName, page });

  const handleSearch = (specieName: string) => {
    setSpecieName(specieName);
    navigate(`/?page=1&term=${specieName}`);
  };

  useEffect(() => {
    localStorage.setItem('specieName', specieName);
  }, [specieName]);

  return (
    <>
      <SearchForm setSpecieName={handleSearch} defaultValue={specieName} />
      <SpeciesList
        speciesList={speciesList}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
}

export default SpeciesLookup;
