import ClearButton from './clear-button.tsx';
import { useParams } from 'react-router';
import useFetchSpecie from '../hooks/use-fetch-specie.ts';

function SpecieDetails() {
  const { specieId } = useParams();
  const { specie, loadingState } = useFetchSpecie(specieId as string);

  return (
    <div className="details-column">
      <div className="column-header">
        SPECIE DETAILS
        <ClearButton />
      </div>
      {loadingState === 'loading' && <div className="cell">Loading...</div>}
      {loadingState === 'error' && (
        <div className="cell">Error fetching specie</div>
      )}
      {loadingState === 'idle' && specie && (
        <>
          <div className="cell">Name: {specie.name}</div>
          <div className="cell">Classification: {specie.classification}</div>
          <div className="cell">Designation: {specie.designation}</div>
          <div className="cell">Average Height: {specie.average_height}</div>
          <div className="cell">Skin Colors: {specie.skin_colors}</div>
          <div className="cell">Hair Colors: {specie.hair_colors}</div>
          <div className="cell">Eye Colors: {specie.eye_colors}</div>
          <div className="cell">
            Average Lifespan: {specie.average_lifespan}
          </div>
          <div className="cell">Homeworld: {specie.homeworld}</div>
          <div className="cell">Language: {specie.language}</div>
        </>
      )}
    </div>
  );
}

export default SpecieDetails;
