import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SpeciesListItems from './species-list-items';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { SpeciesResult } from './sw-api';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { page: '1' },
    push: jest.fn(),
  }),
}));

jest.mock('@components/specie-details', () => {
  const SpecieDetails = () => <div data-testid="specie-details" />;
  SpecieDetails.displayName = 'SpecieDetails';
  return SpecieDetails;
});

const mockStore = configureStore([]);

describe('SpeciesListItems', () => {
  it('renders species list with correct information', () => {
    // Mock data
    const speciesListResults: SpeciesResult[] = [
      {
        id: '1',
        name: 'Human',
        classification: 'mammal',
        designation: 'sentient',
        average_height: '180',
        skin_colors: 'pale',
        hair_colors: 'brown',
        eye_colors: 'blue',
        average_lifespan: '120',
        language: 'Galactic Basic',
      },
    ];

    const initialState = {
      species: {
        selectedItems: {},
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SpeciesListItems speciesListResults={speciesListResults} />
      </Provider>
    );

    expect(screen.getByText('SPECIE')).toBeInTheDocument();

    expect(screen.getByText(/Human/)).toBeInTheDocument();
    expect(
      screen.getByText(/class: mammal, designation: sentient/)
    ).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });
});
