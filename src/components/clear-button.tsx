import { NavLink, useSearchParams } from 'react-router';

function ClearButton() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const term = searchParams.get('term');

  return (
    <NavLink
      to={`/?page=${page}${term ? `&term=${term}` : ''}`}
      className="clear-button"
    >
      X
    </NavLink>
  );
}

export default ClearButton;
