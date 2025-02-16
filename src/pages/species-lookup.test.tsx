import { render, screen, fireEvent } from '@testing-library/react';
import SpeciesLookup from './species-lookup';
import { useGetSpeciesListQuery } from '../services/sw-api';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../features/species/search-form', () => {
  const MockSearchForm = ({
    setSpecieName,
  }: {
    setSpecieName: (name: string) => void;
  }) => (
    <div>
      Mocked SearchForm
      <button onClick={() => setSpecieName('Human')}>Search</button>
    </div>
  );
  MockSearchForm.displayName = 'MockSearchForm';
  return MockSearchForm;
});

jest.mock('../features/species/species-list', () => {
  const MockSpeciesList = ({
    speciesList,
    error,
    isLoading,
  }: {
    speciesList: unknown[];
    error: unknown;
    isLoading: boolean;
  }) => (
    <div>
      Mocked SpeciesList
      {isLoading && <div>Loading...</div>}
      {(error && <div>Error</div>) as JSX.Element}
      {speciesList && <div>Species List</div>}
    </div>
  );
  MockSpeciesList.displayName = 'MockSpeciesList';
  return MockSpeciesList;
});

jest.mock('../services/sw-api', () => ({
  useGetSpeciesListQuery: jest.fn(),
}));

describe('SpeciesLookup', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  test('renders SearchForm and SpeciesList', () => {
    (useGetSpeciesListQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isFetching: false,
    });

    render(
      <Router>
        <SpeciesLookup />
      </Router>
    );

    expect(screen.getByText(/Mocked SearchForm/)).toBeInTheDocument();
    expect(screen.getByText(/Mocked SpeciesList/)).toBeInTheDocument();
  });

  test('displays loading state', () => {
    (useGetSpeciesListQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isFetching: true,
    });

    render(
      <Router>
        <SpeciesLookup />
      </Router>
    );

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  test('displays error state', () => {
    (useGetSpeciesListQuery as jest.Mock).mockReturnValue({
      data: null,
      error: { status: 'FETCH_ERROR', data: undefined, error: 'Error' },
      isFetching: false,
    });

    render(
      <Router>
        <SpeciesLookup />
      </Router>
    );

    expect(screen.getByText(/Error/)).toBeInTheDocument();
  });

  test('displays species list', () => {
    (useGetSpeciesListQuery as jest.Mock).mockReturnValue({
      data: { count: 1, results: [{ name: 'Human' }] },
      error: null,
      isFetching: false,
    });

    render(
      <Router>
        <SpeciesLookup />
      </Router>
    );

    expect(screen.getByText(/Species List/)).toBeInTheDocument();
  });

  test('handles search', () => {
    (useGetSpeciesListQuery as jest.Mock).mockReturnValue({
      data: { count: 1, results: [{ name: 'Human' }] },
      error: null,
      isFetching: false,
    });

    render(
      <Router>
        <SpeciesLookup />
      </Router>
    );

    const searchButtons = screen.getAllByText(/Search/);
    fireEvent.click(searchButtons[0]);

    console.log(document.body.innerHTML);

    expect(screen.getByText(/Species List/)).toBeInTheDocument();
  });
});
