import { SpeciesResult } from '../utils/fetch-species-list.tsx';
import { AsciiTable3 } from 'ascii-table3';
import { NavLink } from 'react-router';

interface SpecieProps {
  specie: SpeciesResult;
}

function SpecieListItem({ specie }: SpecieProps) {
  const formatRow = (species: SpeciesResult) => {
    return (
      <>
        {'\r\n  | '}
        {<NavLink to={`/species/${species.name}`}>{species.name}</NavLink>}
        {AsciiTable3.alignAuto('', 14 - species.name.length)} |{' '}
        {AsciiTable3.alignAuto(
          `class: ${species.classification}, designation: ${species.designation}`,
          40
        )}
        {' |'}
      </>
    );
  };

  return formatRow(specie);
}

export default SpecieListItem;
