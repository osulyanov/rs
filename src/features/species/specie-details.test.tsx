import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SpecieDetails from './specie-details';
import { useGetSpecieQuery } from '../../services/sw-api';

// Mock the useGetSpecieQuery hook
jest.mock('../../services/sw-api', () => ({
  useGetSpecieQuery: jest.fn(),
}));

describe('SpecieDetails', () => {
  it('renders loading state', () => {
    (useGetSpecieQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isFetching: true,
    });

    render(
      <MemoryRouter initialEntries={['/species/1']}>
        <Routes>
          <Route path="/species/:specieId" element={<SpecieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useGetSpecieQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isFetching: false,
    });

    render(
      <MemoryRouter initialEntries={['/species/1']}>
        <Routes>
          <Route path="/species/:specieId" element={<SpecieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Error fetching specie')).toBeInTheDocument();
  });

  it('renders specie details', () => {
    (useGetSpecieQuery as jest.Mock).mockReturnValue({
      data: {
        name: 'Human',
        classification: 'Mammal',
        designation: 'Sentient',
        average_height: '180',
        skin_colors: 'caucasian, black, asian, hispanic',
        hair_colors: 'blonde, brown, black, red',
        eye_colors: 'brown, blue, green, hazel, grey, amber',
        average_lifespan: '120',
        language: 'Galactic Basic',
      },
      error: null,
      isFetching: false,
    });

    render(
      <MemoryRouter initialEntries={['/species/1']}>
        <Routes>
          <Route path="/species/:specieId" element={<SpecieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Name: Human')).toBeInTheDocument();
    expect(screen.getByText('Classification: Mammal')).toBeInTheDocument();
    expect(screen.getByText('Designation: Sentient')).toBeInTheDocument();
    expect(screen.getByText('Average Height: 180')).toBeInTheDocument();
    expect(
      screen.getByText('Skin Colors: caucasian, black, asian, hispanic')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Hair Colors: blonde, brown, black, red')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Eye Colors: brown, blue, green, hazel, grey, amber')
    ).toBeInTheDocument();
    expect(screen.getByText('Average Lifespan: 120')).toBeInTheDocument();
    expect(screen.getByText('Language: Galactic Basic')).toBeInTheDocument();
  });
});
