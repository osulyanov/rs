import { Component } from 'react';
import { SpeciesResult } from '../utils/fetchSpeciesList.tsx';
import { AsciiTable3 } from 'ascii-table3';

interface SpecieProps {
  specie: SpeciesResult;
}

class Specie extends Component<SpecieProps> {
  formatRow = (species: SpeciesResult) => {
    return `
  | ${AsciiTable3.alignAuto(species.name, 14)} | ${AsciiTable3.alignAuto(`class: ${species.classification}, designation: ${species.designation}`, 40)} |`;
  };

  render() {
    return this.formatRow(this.props.specie);
  }
}

export default Specie;
