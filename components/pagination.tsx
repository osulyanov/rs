import { useRouter } from 'next/router';
import { SpeciesListResult } from './sw-api';
import Link from 'next/link';

function Pagination({ speciesList }: { speciesList: SpeciesListResult }) {
  const router = useRouter();
  const { count, next, previous } = speciesList;
  const { page, term } = router.query;
  const totalPages = Math.ceil(count / 10);
  const currentPage = page ? parseInt(page as string) : 1;
  const nextPage = next ? currentPage + 1 : null;
  const prevPage = previous ? currentPage - 1 : null;

  return (
    <div className="pagination">
      <Link
        href={`/?page=${prevPage}${term ? `&term=${term}` : ''}`}
        className={`pagination-button${prevPage ? '' : ' hidden'}`}
      >
        &lt; PREV
      </Link>

      <span className="page-info">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={`/?page=${nextPage}${term ? `&term=${term}` : ''}`}
        className={`pagination-button${nextPage ? '' : ' hidden'}`}
      >
        NEXT &gt;
      </Link>
    </div>
  );
}

export default Pagination;
