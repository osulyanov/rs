import { SpeciesResult } from '../utils/fetchSpeciesList.tsx';
import { AsciiTable3 } from 'ascii-table3';
import Loading from './Loading.tsx';
import LoadingError from './LoadingError.tsx';
import Specie from './Specie.tsx';

interface SpeciesListProps {
  speciesList: SpeciesResult[] | null;
  loadingState: string;
}

function SpeciesList({ speciesList, loadingState }: SpeciesListProps) {
  const lineSep =
    '+----------------+------------------------------------------+';
  const speciesTableHeader = `
  ${lineSep}
  | ${AsciiTable3.alignAuto('Name', 14)} | ${AsciiTable3.alignCenter('Description', 40)} |
  ${lineSep}`;
  const speciesTableEnd = `
  ${lineSep}`;

  return (
    <>
      {loadingState === 'loading' && <Loading />}
      {loadingState === 'error' && (
        <LoadingError message="ERROR FETCHING SPECIES" />
      )}
      {speciesList !== null &&
        (speciesList.length === 0 ? (
          <LoadingError message="NO SPECIES FOUND" />
        ) : (
          <pre className="data-report">
            {speciesTableHeader}
            {speciesList.map((specie, index) => {
              return <Specie key={index} specie={specie} />;
            })}
            {speciesTableEnd}
          </pre>
        ))}
    </>
  );
}

export default SpeciesList;
