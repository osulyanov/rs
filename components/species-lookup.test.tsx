import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SpeciesLookup from './species-lookup';
import { useRouter } from 'next/router';
import { useGetSpeciesListQuery } from '@components/sw-api';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@components/sw-api', () => ({
  useGetSpeciesListQuery: jest.fn(),
}));

jest.mock('@components/species-list', () => {
  const MockedSpeciesList = () => <div>Mocked SpeciesList</div>;
  MockedSpeciesList.displayName = 'MockedSpeciesList';
  return MockedSpeciesList;
});

describe('SpeciesLookup', () => {
  const mockRouter = {
    query: { page: '1' },
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useGetSpeciesListQuery as jest.Mock).mockReturnValue({
      data: { results: [] },
      error: null,
      isFetching: false,
    });
  });

  it('renders the search form', () => {
    render(<SpeciesLookup />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
