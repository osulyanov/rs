import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SpeciesList from './species-list';
import { SpeciesListResult } from '../utils/fetch-species-list';

describe('SpeciesList', () => {
  const mockSpeciesList: SpeciesListResult = {
    results: [
      {
        name: 'Specie 1',
        classification: 'Class 1',
        designation: 'Designation 1',
        url: 'url1',
      },
      {
        name: 'Specie 2',
        classification: 'Class 2',
        designation: 'Designation 2',
        url: 'url2',
      },
    ],
    count: 2,
    next: null,
    previous: null,
  };

  test('renders the specified number of cards', async () => {
    render(
      <Router>
        <SpeciesList speciesList={mockSpeciesList} loadingState="loaded" />
      </Router>
    );
    const cards = await screen.findAllByText(/class:/i);
    expect(cards).toHaveLength(mockSpeciesList.results.length);
  });

  test('displays appropriate message if no cards are present', async () => {
    render(
      <Router>
        <SpeciesList
          speciesList={{ results: [], count: 0, next: null, previous: null }}
          loadingState="loaded"
        />
      </Router>
    );
    const messageBox = await screen.findByText((_, element) => {
      return (
        (element?.tagName.toLowerCase() === 'p' &&
          element.textContent?.includes('No species found')) ||
        false
      );
    });
    expect(messageBox).toBeInTheDocument();
  });
});
