import MessageBox from './message-box';
import SpeciesListItems from './species-list-items';
import Pagination from './pagination';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { SpeciesListResult } from '../services/sw-api';

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
            <SpeciesListItems speciesList={speciesList.results} />
          </>
        ) : null}
      </div>
      {!isLoading && speciesList && <Pagination speciesList={speciesList} />}
    </>
  );
}

export default SpeciesList;
