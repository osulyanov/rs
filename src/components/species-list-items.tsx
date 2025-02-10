import { SpeciesResult } from '../utils/fetch-species-list.tsx';
import { NavLink, NavLinkRenderProps, useSearchParams } from 'react-router';

interface SpeciesListItemsProps {
  speciesList: SpeciesResult[];
}

function SpeciesListItems({ speciesList }: SpeciesListItemsProps) {
  const [searchParams] = useSearchParams();

  const linkStyle = ({ isActive }: NavLinkRenderProps) => ({
    textDecoration: isActive ? 'underline' : 'none',
  });
  const page = searchParams.get('page');
  const term = searchParams.get('term');

  return (
    <>
      <div className="items-column">
        <div className="column-header">SPECIE</div>
        {speciesList?.map((specie, index) => (
          <div key={index} className="cell">
            <NavLink
              to={`/species/${index}?page=${page}${term && `&term=${term}`}`}
              style={linkStyle}
            >
              {specie.name}
            </NavLink>
          </div>
        ))}
      </div>
      <div className="details-column">
        <div className="column-header">DETAILS</div>
        {speciesList?.map((specie, index) => (
          <div key={index} className="cell">
            class: {specie.classification}, designation: {specie.designation}
          </div>
        ))}
      </div>
    </>
  );
}

export default SpeciesListItems;
