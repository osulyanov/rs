import { useRouter } from 'next/router';
import Link from 'next/link';

function ClearButton() {
  const router = useRouter();
  const { page, term } = router.query;

  return (
    <Link
      href={`/?page=${page}${term ? `&term=${term}` : ''}`}
      className="clear-button"
    >
      X
    </Link>
  );
}

export default ClearButton;
