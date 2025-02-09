import { SpeciesResult } from '../utils/fetchSpeciesList.tsx';
import { AsciiTable3 } from 'ascii-table3';
import MessageBox from './MessageBox.tsx';
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
      {loadingState === 'loading' && (
        <MessageBox message={'LOADING SPECIES...'} />
      )}
      {loadingState === 'error' && (
        <MessageBox message="ERROR FETCHING SPECIES" />
      )}
      {speciesList !== null &&
        (speciesList.length === 0 ? (
          <MessageBox message="NO SPECIES FOUND" />
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
