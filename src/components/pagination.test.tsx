import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Pagination from './pagination';
import { SpeciesListResult } from '../services/sw-api';

const mockSpeciesList: SpeciesListResult = {
  count: 20,
  next: 'https://swapi.dev/api/species/?page=2',
  previous: null,
  results: [],
};

describe('Pagination', () => {
  it('updates URL query parameter when next page is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Routes>
          <Route
            path="/"
            element={<Pagination speciesList={mockSpeciesList} />}
          />
        </Routes>
      </MemoryRouter>
    );

    const nextButton = screen.getByText('NEXT >');
    expect(nextButton).toHaveAttribute('href', '/?page=2');
    userEvent.click(nextButton);
  });

  it('updates URL query parameter when previous page is clicked', async () => {
    const mockSpeciesListWithPrev: SpeciesListResult = {
      ...mockSpeciesList,
      previous: 'https://swapi.dev/api/species/?page=1',
    };

    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <Routes>
          <Route
            path="/"
            element={<Pagination speciesList={mockSpeciesListWithPrev} />}
          />
        </Routes>
      </MemoryRouter>
    );

    const prevButton = screen.getByText('< PREV');
    expect(prevButton).toHaveAttribute('href', '/?page=1');
    userEvent.click(prevButton);
  });
});
