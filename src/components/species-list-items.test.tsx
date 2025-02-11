import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SpeciesListItems from './species-list-items';
import fetchSpecie from '../utils/fetch-specie';
import SpecieDetails from './specie-details';

jest.mock('../utils/fetch-specie', () => jest.fn());

const mockSpeciesList = [
  {
    url: 'https://swapi.dev/api/species/1/',
    name: 'Human',
    classification: 'mammal',
    designation: 'sentient',
  },
  {
    url: 'https://swapi.dev/api/species/2/',
    name: 'Droid',
    classification: 'artificial',
    designation: 'sentient',
  },
];

describe('SpeciesListItems', () => {
  test('renders relevant species data', () => {
    render(
      <MemoryRouter>
        <SpeciesListItems speciesList={mockSpeciesList} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Human/)).toBeInTheDocument();
    expect(screen.getByText(/Droid/)).toBeInTheDocument();
  });

  test('clicking on a species opens the specie-details component', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={<SpeciesListItems speciesList={mockSpeciesList} />}
          />
          <Route path="/species/:id" element={<div>Specie Details</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Human/));
    expect(screen.getByText(/Specie Details/)).toBeInTheDocument();
  });

  test('clicking triggers an additional API call to fetch detailed information', async () => {
    (fetchSpecie as jest.Mock).mockResolvedValueOnce({
      ...mockSpeciesList[0],
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={<SpeciesListItems speciesList={mockSpeciesList} />}
          />
          <Route path="/species/:specieId" element={<SpecieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(screen.getByText(/Human/));
    });
    expect(fetchSpecie).toHaveBeenCalledWith(mockSpeciesList[0]['url']);
  });
});
