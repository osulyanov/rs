import { SpeciesResult } from '../utils/fetchSpeciesList.tsx';
import { AsciiTable3 } from 'ascii-table3';

interface SpecieProps {
  specie: SpeciesResult;
}

function Specie({ specie }: SpecieProps) {
  const formatRow = (species: SpeciesResult) => {
    return `
  | ${AsciiTable3.alignAuto(species.name, 14)} | ${AsciiTable3.alignAuto(`class: ${species.classification}, designation: ${species.designation}`, 40)} |`;
  };

  return formatRow(specie);
}

export default Specie;
