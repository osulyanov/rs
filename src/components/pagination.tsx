import { SpeciesListResult } from '../utils/fetch-species-list.tsx';
import { Link, useSearchParams } from 'react-router';

function Pagination({ speciesList }: { speciesList: SpeciesListResult }) {
  const [searchParams] = useSearchParams();

  const { count, next, previous } = speciesList;
  const page = searchParams.get('page');
  const term = searchParams.get('term');
  const totalPages = Math.ceil(count / 10);
  const currentPage = page ? parseInt(page) : 1;
  const nextPage = next ? currentPage + 1 : null;
  const prevPage = previous ? currentPage - 1 : null;

  return (
    <div className="pagination">
      <Link
        to={`/?page=${prevPage}${term ? `&term=${term}` : ''}`}
        className={`pagination-button${prevPage ? '' : ' hidden'}`}
      >
        &lt; PREV
      </Link>

      <span className="page-info">
        Page {page} of {totalPages}
      </span>
      <Link
        to={`/?page=${nextPage}${term ? `&term=${term}` : ''}`}
        className={`pagination-button${nextPage ? '' : ' hidden'}`}
      >
        NEXT &gt;
      </Link>
    </div>
  );
}

export default Pagination;
