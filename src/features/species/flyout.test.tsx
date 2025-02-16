import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { Flyout } from './flyout';
import speciesReducer, { SpeciesState } from './species-slice';

const initialState: SpeciesState = {
  selectedItems: {
    1: {
      id: '1',
      url: 'https://swapi.dev/api/species/1/',
      name: 'Human',
      classification: 'Mammal',
      designation: 'Sentient',
      average_height: '180',
      skin_colors: 'various',
      hair_colors: 'various',
      eye_colors: 'various',
      average_lifespan: '80',
      language: 'various',
    },
    2: {
      id: '2',
      url: 'https://swapi.dev/api/species/2/',
      name: 'Wookiee',
      classification: 'Mammal',
      designation: 'Sentient',
      average_height: '210',
      skin_colors: 'gray',
      hair_colors: 'brown',
      eye_colors: 'blue',
      average_lifespan: '400',
      language: 'Shyriiwook',
    },
  },
  currentItems: [],
  totalCount: 0,
  isLoading: false,
  currentDetails: null,
};

describe('Flyout', () => {
  let store: EnhancedStore<{ species: SpeciesState }>;

  beforeAll(() => {
    global.URL.createObjectURL = jest.fn();
  });

  beforeEach(() => {
    store = configureStore({
      reducer: {
        species: speciesReducer,
      },
      preloadedState: {
        species: initialState,
      },
    });
  });

  test('renders correctly when there are selected items', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText('2 locations selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  test('does not render when there are no selected items', () => {
    store = configureStore({
      reducer: {
        species: speciesReducer,
      },
      preloadedState: {
        species: {
          ...initialState,
          selectedItems: {},
        },
      },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.queryByText('locations selected')).not.toBeInTheDocument();
  });

  test('dispatches unselectAllItems action when Unselect all button is clicked', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText('Unselect all'));

    const actions = store.getState().species.selectedItems;
    expect(actions).toEqual({});
  });

  test('downloads CSV when Download button is clicked', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const createElementSpy = jest.spyOn(document, 'createElement');
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');

    fireEvent.click(screen.getByText('Download'));

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
  });
});
