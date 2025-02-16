import ClearButton from '../../components/clear-button';
import { useParams } from 'react-router';
import { useGetSpecieQuery } from '../../services/sw-api';

function SpecieDetails() {
  const { specieId } = useParams();
  const {
    data: specie,
    error,
    isFetching: isLoading,
  } = useGetSpecieQuery(specieId as string);

  const formatKey = (key: string) => {
    return key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

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
