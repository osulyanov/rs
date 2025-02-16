import { NavLink, Outlet, useNavigate, useSearchParams } from 'react-router';
import { SpeciesResult } from '../../services/sw-api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ChangeEvent } from 'react';
import { selectItem, unselectItem } from './species-slice';

interface SpeciesListItemsProps {
  speciesListResults: SpeciesResult[];
}

function SpeciesListItems({ speciesListResults }: SpeciesListItemsProps) {
  const dispatch = useDispatch();
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

  const selectedItems = useSelector(
    (state: RootState) => state.species.selectedItems
  );

  const isItemSelected = (id: string) => !!selectedItems[id];

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    specie: SpeciesResult
  ) => {
    if (event.target.checked) {
      dispatch(selectItem(specie));
    } else {
      dispatch(unselectItem(specie));
    }
  };

  return (
    <>
      <div className="items-column" onClick={handleItemsColumnClick}>
        <div className="column-header">SPECIE</div>
        {speciesListResults?.map((specie, index) => (
          <div key={index} className="cell">
            <input
              type={'checkbox'}
              checked={isItemSelected(specie.id)}
              onChange={(event) => {
                handleCheckboxChange(event, specie);
              }}
            />{' '}
            <NavLink
              to={{
                pathname: `/species/${specie.id}`,
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
