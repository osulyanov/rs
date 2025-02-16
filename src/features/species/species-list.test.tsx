import { render, screen } from '@testing-library/react';
import SpeciesList from './species-list';
import { SpeciesListResult } from '../../services/sw-api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Mock the components
jest.mock('./species-list-items', () => {
  const MockSpeciesListItems = () => <div>Mocked SpeciesListItems</div>;
  MockSpeciesListItems.displayName = 'MockSpeciesListItems';
  return MockSpeciesListItems;
});
jest.mock('../../components/pagination', () => {
  const MockPagination = () => <div>Mocked Pagination</div>;
  MockPagination.displayName = 'MockPagination';
  return MockPagination;
});
jest.mock('./flyout', () => ({
  Flyout: () => <div>Mocked Flyout</div>,
}));

describe('SpeciesList', () => {
  const mockSpeciesList: SpeciesListResult = {
    count: 2,
    next: null,
    previous: null,
    results: [
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
    ],
  };

  test('renders loading message when loading', () => {
    render(
      <SpeciesList speciesList={undefined} error={undefined} isLoading={true} />
    );
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  test('renders error message when there is an error', () => {
    const mockError: FetchBaseQueryError = {
      status: 'FETCH_ERROR',
      data: undefined,
      error: 'Error fetching species',
    };
    render(
      <SpeciesList
        speciesList={undefined}
        error={mockError}
        isLoading={false}
      />
    );
    expect(screen.getByText(/Error fetching species/)).toBeInTheDocument();
  });

  test('renders no species found message when species list is empty', () => {
    const emptySpeciesList: SpeciesListResult = {
      count: 0,
      results: [],
      next: null,
      previous: null,
    };
    render(
      <SpeciesList
        speciesList={emptySpeciesList}
        error={undefined}
        isLoading={false}
      />
    );
    expect(screen.getByText(/No species found/)).toBeInTheDocument();
  });

  test('renders species list items when species list is not empty', () => {
    render(
      <SpeciesList
        speciesList={mockSpeciesList}
        error={undefined}
        isLoading={false}
      />
    );
    expect(screen.getByText(/Mocked SpeciesListItems/)).toBeInTheDocument();
  });

  test('renders pagination when species list is not empty and not loading', () => {
    render(
      <SpeciesList
        speciesList={mockSpeciesList}
        error={undefined}
        isLoading={false}
      />
    );
    expect(screen.getByText(/Mocked Pagination/)).toBeInTheDocument();
  });

  test('renders flyout component', () => {
    render(
      <SpeciesList
        speciesList={mockSpeciesList}
        error={undefined}
        isLoading={false}
      />
    );
    expect(screen.getByText(/Mocked Flyout/)).toBeInTheDocument();
  });
});
