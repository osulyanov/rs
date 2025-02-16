import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import SpeciesListItems from './species-list-items';
import speciesReducer, { SpeciesState } from './species-slice';
import { SpeciesResult } from '../../services/sw-api';

const speciesListResults: SpeciesResult[] = [
  {
    id: '1',
    name: 'Human',
    classification: 'Mammal',
    designation: 'Sentient',
    url: 'https://swapi.dev/api/species/1/',
    average_height: '180',
    skin_colors: 'caucasian, black, asian, hispanic',
    hair_colors: 'blonde, brown, black, red',
    eye_colors: 'brown, blue, green, hazel',
    average_lifespan: '120',
    language: 'Galactic Basic',
  },
  {
    id: '2',
    name: 'Droid',
    classification: 'Artificial',
    designation: 'Sentient',
    url: 'https://swapi.dev/api/species/2/',
    average_height: 'n/a',
    skin_colors: 'n/a',
    hair_colors: 'n/a',
    eye_colors: 'n/a',
    average_lifespan: 'indefinite',
    language: 'n/a',
  },
];

const initialSpeciesState: SpeciesState = {
  selectedItems: {},
  currentItems: [],
  totalCount: 0,
  isLoading: false,
  currentDetails: null,
};

describe('SpeciesListItems', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        species: speciesReducer,
      },
      preloadedState: {
        species: initialSpeciesState,
      },
    });
  });

  test('renders species list items', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SpeciesListItems speciesListResults={speciesListResults} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Human/)).toBeInTheDocument();
    expect(screen.getByText(/Droid/)).toBeInTheDocument();
  });

  test('handles checkbox change', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SpeciesListItems speciesListResults={speciesListResults} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    const actions = store.getState().species.selectedItems;
    expect(actions['1']).toBeDefined();
  });

  test('navigates on column click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SpeciesListItems speciesListResults={speciesListResults} />
        </MemoryRouter>
      </Provider>
    );

    const column = screen.getByText(/SPECIE/);
    fireEvent.click(column);

    expect(window.location.pathname).toBe('/');
  });
});
