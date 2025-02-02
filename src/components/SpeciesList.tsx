import { Component } from 'react';
import { SpeciesResult } from '../utils/fetchSpeciesList.tsx';
import { AsciiTable3 } from 'ascii-table3';
import Loading from './Loading.tsx';
import LoadingError from './LoadingError.tsx';
import Specie from './Specie.tsx';

class SpeciesList<
  P extends { speciesList: SpeciesResult[] | null; loadingState: string },
> extends Component<P> {
  lineSep = '+----------------+------------------------------------------+';
  speciesTableHeader = `
  ${this.lineSep}
  | ${AsciiTable3.alignAuto('Name', 14)} | ${AsciiTable3.alignCenter('Description', 40)} |
  ${this.lineSep}`;
  speciesTableEnd = `
  ${this.lineSep}`;

  render() {
    return (
      <>
        {this.props.loadingState === 'loading' && <Loading />}
        {this.props.loadingState === 'error' && (
          <LoadingError message="ERROR FETCHING SPECIES" />
        )}
        {this.props.speciesList !== null &&
          (this.props.speciesList.length === 0 ? (
            <LoadingError message="NO SPECIES FOUND" />
          ) : (
            <pre className="data-report">
              {this.speciesTableHeader}
              {this.props.speciesList.map((specie, index) => {
                return <Specie key={index} specie={specie} />;
              })}
              {this.speciesTableEnd}
            </pre>
          ))}
      </>
    );
  }
}

export default SpeciesList;
