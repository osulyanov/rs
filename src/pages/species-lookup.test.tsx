import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SpeciesLookup from './species-lookup';
import useFetchSpecies from '../hooks/use-fetch-species';

jest.mock('../hooks/use-fetch-species', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('SpeciesLookup', () => {
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  it('saves the entered value to local storage when the Search button is clicked', async () => {
    (useFetchSpecies as jest.Mock).mockReturnValue({
      speciesList: {
        count: 1,
        next: null,
        previous: null,
        results: [
          { name: 'Wookie', url: '', classification: '', designation: '' },
        ],
      },
      loadingState: 'idle',
    });

    render(
      <MemoryRouter>
        <SpeciesLookup />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('[ENTER SPECIE]');
    const searchButton = screen.getByText('> SEARCH');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'Wookie' } });
      fireEvent.click(searchButton);
    });

    expect(localStorage.getItem('specieName')).toBe('Wookie');
  });

  it('retrieves the value from local storage upon mounting', async () => {
    localStorage.setItem('specieName', 'Wookie');
    (useFetchSpecies as jest.Mock).mockReturnValue({
      speciesList: {
        count: 1,
        next: null,
        previous: null,
        results: [
          { name: 'Wookie', url: '', classification: '', designation: '' },
        ],
      },
      loadingState: 'idle',
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <SpeciesLookup />
        </MemoryRouter>
      );
    });

    const input = screen.getByPlaceholderText('[ENTER SPECIE]');
    expect(input).toHaveValue('Wookie');
  });
});
