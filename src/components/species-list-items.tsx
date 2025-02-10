import { SpeciesResult } from '../utils/fetch-species-list.tsx';
import {
  NavLink,
  NavLinkRenderProps,
  Outlet,
  useNavigate,
  useSearchParams,
} from 'react-router';

interface SpeciesListItemsProps {
  speciesList: SpeciesResult[];
}

function SpeciesListItems({ speciesList }: SpeciesListItemsProps) {
  const linkStyle = ({ isActive }: NavLinkRenderProps) => ({
    textDecoration: isActive ? 'underline' : undefined,
  });
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
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
              to={`/species/${specie.url.split('/').slice(-2)[0]}?page=${page}${term ? `&term=${term} ` : ''}`}
              style={linkStyle}
              className={'glitch-hover'}
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
