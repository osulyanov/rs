import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { parseCookies, setCookie } from 'nookies';
import { useGetSpeciesListQuery } from '@components/sw-api';
import SpeciesList from '@components/species-list';
import SearchForm from '@components/search-form';

function SpeciesLookup() {
  const router = useRouter();
  const { page } = router.query;
  const cookies = parseCookies();
  const savedSpecieName = cookies.specieName || '';
  const [specieName, setSpecieName] = useState(savedSpecieName);
  const {
    data: speciesList,
    error,
    isFetching: isLoading,
  } = useGetSpeciesListQuery({
    specieName,
    page: parseInt(page as string) || 1,
  });

  const handleSearch = (specieName: string) => {
    setSpecieName(specieName);
    router.push(`/?page=1&term=${specieName}`);
  };

  useEffect(() => {
    setCookie(null, 'specieName', specieName, { path: '/' });
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
