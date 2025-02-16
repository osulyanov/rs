import { NavLink, Outlet, useNavigate, useSearchParams } from 'react-router';
import { SpeciesResult } from '../../services/sw-api';

interface SpeciesListItemsProps {
  speciesList: SpeciesResult[];
}

function SpeciesListItems({ speciesList }: SpeciesListItemsProps) {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const term = searchParams.get('term');
  const navigate = useNavigate();

  const handleItemsColumnClick = () => {
    navigate(`/?page=${page}${term ? `&term=${term}` : ''}`);
  };
  const handleLinkClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className="items-column" onClick={handleItemsColumnClick}>
        <div className="column-header">SPECIE</div>
        {speciesList?.map((specie, index) => (
          <div key={index} className="cell">
            <NavLink
              to={{
                pathname: `/species/${specie.url.split('/').slice(-2)[0]}`,
                search: `?page=${page}${term ? `&term=${term} ` : ''}`,
              }}
              onClick={handleLinkClick}
            >
              <strong>{specie.name}.</strong> (class: {specie.classification},
              designation: {specie.designation})
            </NavLink>
          </div>
        ))}
      </div>
      <Outlet />
    </>
  );
}

export default SpeciesListItems;
