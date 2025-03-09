import ClearButton from './clear-button';
import { useRouter } from 'next/router';
import { useGetSpecieQuery } from './sw-api';

function SpecieDetails() {
  const router = useRouter();
  const { specieId } = router.query;

  const {
    data: specie,
    error,
    isFetching: isLoading,
  } = useGetSpecieQuery(specieId as string, {
    skip: !specieId,
  });

  const formatKey = (key: string) => {
    return key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (!specieId) return null;

  return (
    <div className="details-column">
      <div className="column-header">
        SPECIE DETAILS
        <ClearButton />
      </div>
      {isLoading && <div className="cell">Loading...</div>}
      {error && <div className="cell">Error fetching specie</div>}
      {specie && (
        <>
          {[
            'name',
            'classification',
            'designation',
            'average_height',
            'skin_colors',
            'hair_colors',
            'eye_colors',
            'average_lifespan',
            'language',
          ]
            .filter(
              (key) =>
                specie[key] &&
                specie[key] !== 'n/a' &&
                specie[key] !== 'unknown'
            )
            .map((key) => (
              <div className="cell" key={key}>
                {formatKey(key)}: {specie[key]}
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default SpecieDetails;
