import { SpeciesResult } from './sw-api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { ChangeEvent } from 'react';
import { selectItem, unselectItem } from './species-slice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SpecieDetails from '@components/specie-details';

interface SpeciesListItemsProps {
  speciesListResults: SpeciesResult[];
}

function SpeciesListItems({ speciesListResults }: SpeciesListItemsProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { page = '1', term } = router.query;

  const handleItemsColumnClick = () => {
    router.push(`/?page=${page}${term ? `&term=${term}` : ''}`);
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
            <Link
              href={`/species/${specie.id}?page=${page}${term ? `&term=${term} ` : ''}`}
              onClick={handleLinkClick}
            >
              <strong>{specie.name}.</strong> (class: {specie.classification},
              designation: {specie.designation})
            </Link>
          </div>
        ))}
      </div>
      <SpecieDetails />
    </>
  );
}

export default SpeciesListItems;
