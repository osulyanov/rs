import { SpeciesListResult } from '../utils/fetch-species-list.tsx';
import { NavLink, useSearchParams } from 'react-router';

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
      <NavLink
        to={`/?page=${prevPage}${term ? `&term=${term}` : ''}`}
        className={`pagination-button${prevPage ? '' : ' hidden'}`}
      >
        &lt; PREV
      </NavLink>

      <span className="page-info">
        Page {page} of {totalPages}
      </span>
      <NavLink
        to={`/?page=${nextPage}${term ? `&term=${term}` : ''}`}
        className={`pagination-button${nextPage ? '' : ' hidden'}`}
      >
        NEXT &gt;
      </NavLink>
    </div>
  );
}

export default Pagination;
