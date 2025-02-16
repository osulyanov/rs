import MessageBox from '../../components/message-box';
import SpeciesListItems from './species-list-items';
import Pagination from '../../components/pagination';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { SpeciesListResult } from '../../services/sw-api';
import { Flyout } from './flyout';

interface SpeciesListProps {
  speciesList: SpeciesListResult | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
}

function SpeciesList({ speciesList, error, isLoading }: SpeciesListProps) {
  return (
    <>
      <div className="data-report">
        {error ? (
          <MessageBox message="Error fetching species" />
        ) : isLoading ? (
          <MessageBox message="Loading..." />
        ) : speciesList && speciesList.results.length == 0 ? (
          <MessageBox message="No species found" />
        ) : speciesList && speciesList.results.length > 0 ? (
          <>
            <SpeciesListItems speciesListResults={speciesList.results} />
          </>
        ) : null}
      </div>
      {!isLoading && speciesList && <Pagination speciesList={speciesList} />}
      <Flyout />
    </>
  );
}

export default SpeciesList;
