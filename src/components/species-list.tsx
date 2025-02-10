import { SpeciesResult } from '../utils/fetch-species-list.tsx';
import MessageBox from './message-box.tsx';
import SpeciesListItems from './species-list-items.tsx';

interface SpeciesListProps {
  speciesList: SpeciesResult[] | null;
  loadingState: string;
}

function SpeciesList({ speciesList, loadingState }: SpeciesListProps) {
  return (
    <div className="data-report">
      {loadingState === 'loading' && <MessageBox message="Loading..." />}
      {loadingState === 'error' && (
        <MessageBox message="Error loading species list" />
      )}
      {speciesList !== null &&
        (speciesList.length == 0 ? (
          <MessageBox message="No species found" />
        ) : (
          <SpeciesListItems speciesList={speciesList} />
        ))}
    </div>
  );
}

export default SpeciesList;
