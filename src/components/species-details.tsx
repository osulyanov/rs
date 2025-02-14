import { SpeciesResult } from '../services/sw-api';

interface SpeciesDetailsProps {
  speciesList?: SpeciesResult[];
}

function SpeciesDetails({ speciesList }: SpeciesDetailsProps) {
  return (
    <>
      <div className="column-header">SPECIES DETAILS</div>
      {speciesList?.map((specie, index) => (
        <div key={index} className="cell">
          class: {specie.classification}, designation: {specie.designation}
        </div>
      ))}
    </>
  );
}

export default SpeciesDetails;
