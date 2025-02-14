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
        {isLoading && <MessageBox message="Loading..." />}
        {error && <MessageBox message="Error fetching species" />}
        {speciesList !== undefined &&
          (speciesList.results.length == 0 ? (
            <MessageBox message="No species found" />
          ) : (
            <>
              <SpeciesListItems speciesList={speciesList.results} />
            </>
          ))}
      </div>
      {speciesList !== undefined && <Pagination speciesList={speciesList} />}
    </>
  );
}

export default SpeciesList;
