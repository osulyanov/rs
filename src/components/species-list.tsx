import { SpeciesListResult } from '../utils/fetch-species-list.tsx';
import MessageBox from './message-box.tsx';
import SpeciesListItems from './species-list-items.tsx';
import Pagination from './pagination.tsx';

interface SpeciesListProps {
  speciesList: SpeciesListResult | null;
  loadingState: string;
}

function SpeciesList({ speciesList, loadingState }: SpeciesListProps) {
  return (
    <>
      <div className="data-report">
        {loadingState === 'loading' && <MessageBox message="Loading..." />}
        {loadingState === 'error' && (
          <MessageBox message="Error loading species list" />
        )}
        {speciesList !== null &&
          (speciesList.results.length == 0 ? (
            <MessageBox message="No species found" />
          ) : (
            <>
              <SpeciesListItems speciesList={speciesList.results} />
            </>
          ))}
      </div>
      {speciesList !== null && <Pagination speciesList={speciesList} />}
    </>
  );
}

export default SpeciesList;
