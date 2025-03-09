import { RootState } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { unselectAllItems } from './species-slice';
import Papa from 'papaparse';

export function Flyout() {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.species.selectedItems
  );
  const selectedCount = Object.keys(selectedItems).length;

  if (selectedCount === 0) {
    return null;
  }

  const handleDownload = () => {
    const items = Object.values(selectedItems).map((item) => ({
      name: item.name,
      classification: item.classification,
      designation: item.designation,
      average_height: item.average_height,
      skin_colors: item.skin_colors,
      hair_colors: item.hair_colors,
      eye_colors: item.eye_colors,
      average_lifespan: item.average_lifespan,
      language: item.language,
    }));
    const csv = Papa.unparse(items);
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedCount}_species.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flyout">
      <span>
        {selectedCount} location{selectedCount > 1 ? 's' : ''} selected
      </span>
      <button
        className="flyout-button"
        onClick={() => dispatch(unselectAllItems())}
      >
        Unselect all
      </button>
      <button className="flyout-button" onClick={() => handleDownload()}>
        Download
      </button>
    </div>
  );
}
